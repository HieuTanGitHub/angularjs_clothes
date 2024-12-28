import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Review } from 'src/app/models/review';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:3000'; // Địa chỉ API

  constructor(private httpClient: HttpClient) { }

  // Lấy tất cả sản phẩm
  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.url}/san_pham`);
  }

  // Lấy sản phẩm theo truy vấn
  getProductByQuery(params: any): Observable<Product[]> {
    let query = '';
    if (params.keyword) {
      query = `keyword=${params.keyword}`;
    } else if (params.category) {
      query = `category=${params.category}`;
    }
    return this.httpClient.get<Product[]>(`${this.url}/product?${query}`);
  }

  // Lấy sản phẩm theo ID
  get(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/san_pham/${id}`);
  }

  // Xóa sản phẩm theo ID
  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.url}/san_pham/${id}`);
  }

  // Lưu sản phẩm mới
  save(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.url}/san_pham`, product);
  }
  
  // Cập nhật sản phẩm theo ID
  update(id: string, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.url}/san_pham/${id}`, product);
  }

  uploadImage(formData: FormData): Observable<{ imageUrl: string }> {
    return this.httpClient.post<{ imageUrl: string }>(`${this.url}/upload-image`, formData).pipe(
      map(response => {
        response.imageUrl = `assets/img/${response.imageUrl}`; // Đảm bảo đường dẫn hình ảnh được sử dụng trong Angular
        return response;
      })
    );
  }


  // Lấy sản phẩm liên quan theo danh mục
  getRelatedProducts(category: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.url}/san_pham?category=${category}`);
  }

  // Lấy sản phẩm liên quan theo ID
  getRelatedProductsById(productId: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.url}/san_pham?relatedId=${productId}`);
  }

  // Gửi đánh giá mới
  submitReview(productId: string, review: Review): Observable<Review> {
    return this.httpClient.post<Review>(`${this.url}/reviews`, review);
  }

  // Lấy đánh giá cho một sản phẩm theo ID
  getReviewsByProductId(productId: string): Observable<Review[]> {
    return this.httpClient.get<Review[]>(`${this.url}/reviews?productId=${productId}`);
  }

  // Phương thức để tăng lượt xem cho một sản phẩm
  incrementViewCount(productId: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/san_pham/${productId}`).pipe(
      switchMap(product => {
        const currentViewCount = Number(product.xem) || 0; // Chuyển đổi số lượt xem hiện tại thành số
        const updatedViewCount = currentViewCount + 1; // Tăng số lượt xem lên 1
        return this.httpClient.patch<Product>(`${this.url}/san_pham/${productId}`, { xem: updatedViewCount }).pipe(
          map(updatedProduct => {
            updatedProduct.xem = updatedViewCount; // Cập nhật số lượt xem trong đối tượng sản phẩm
            return updatedProduct;
          })
        );
      })
    );
  }

  // Cập nhật phương thức lấy sản phẩm phổ biến
  getTopSellingProduct(): Observable<Product | null> {
    return this.httpClient.get<Product[]>(`${this.url}/san_pham`).pipe( // Lấy tất cả sản phẩm
      map(products => {
        const visibleProducts = products.filter(product => product.an_hien); // Lọc sản phẩm hiển thị
        const topProduct = visibleProducts.reduce((prev, current) => (prev.xem > current.xem) ? prev : current, visibleProducts[0]);
        return topProduct || null;
      })
    );
  }

  // Cập nhật phương thức lấy sản phẩm phổ biến
  getSellingProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.url}/san_pham`).pipe( // Lấy tất cả sản phẩm
      map(products => {
        const visibleProducts = products.filter(product => product.an_hien); // Lọc sản phẩm hiển thị
        const topProducts = visibleProducts
          .sort((a, b) => (b.xem || 0) - (a.xem || 0)) // Sắp xếp theo lượt xem giảm dần
          .slice(0, 8); // Lấy 8 sản phẩm phổ biến nhất
        return topProducts; // Trả về mảng sản phẩm phổ biến
      })
    );
  }

  getLatestProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.url}/san_pham`).pipe(
      map(products => {
        // Sắp xếp sản phẩm theo ngày đăng giảm dần (ngày mới nhất ở đầu)
        return products.filter(product => product.an_hien).sort((a, b) =>
          new Date(b.ngay).getTime() - new Date(a.ngay).getTime()
        );
      }),
      map(products => products.slice(0, 8)) // Lấy 8 sản phẩm mới nhất
    );
  }

  getAllProductTypes(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.url}/danh_muc`);
  }

  saveProductWithImage(product: Product, file: File): Observable<Product> {
    const formData = new FormData();
    formData.append('file', file); // Gửi file lên server
    return this.uploadImage(formData).pipe(
      switchMap(response => {
        product.hinh = response.imageUrl; // Cập nhật đường dẫn hình ảnh vào sản phẩm
        return this.save(product); // Lưu sản phẩm với hình ảnh đã upload
      })
    );
  }


  // Phương thức để cập nhật sản phẩm kèm hình ảnh
  updateProductWithImage(id: string, product: Product, file: File): Observable<Product> {
    const formData = new FormData();
    formData.append('file', file); // Đảm bảo là gửi đúng tên trường cho file
    return this.uploadImage(formData).pipe(
      switchMap(response => {
        product.hinh = response.imageUrl; // Đặt đường dẫn hình ảnh vào sản phẩm
        return this.update(id, product); // Cập nhật sản phẩm cùng với đường dẫn hình ảnh
      })
    );
  }

}

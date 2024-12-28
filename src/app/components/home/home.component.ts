import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { NewsService } from 'src/app/services/news.service';

import { Category } from './../../models/category';
import { Product } from 'src/app/models/product';
import { AlbumImage } from '../../models/albumimages';
import { News } from 'src/app/models/news';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLogin: boolean = false;
  products!: Product[];
  promotionalProducts!: Product[];
  categories!: Category[];
  successMessage: string = '';
  albumImages: AlbumImage[] = [];
  newsArticles: News[] = [];
  topSellingProduct: Product | null = null;
  selectedSize: { [key: string]: number } = {}; // Lưu kích cỡ đã chọn cho từng sản phẩm
  sizes: number[] = [36, 37, 38, 39, 40, 41, 42, 43, 44];
  popularProducts: Product[] = [];
  manufacturerNames: { [productId: string]: string } = {};

  currentPage: number = 0; // Bắt đầu từ trang đầu tiên
  itemsPerPage: number = 4; // Số lượng danh mục trên một trang

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private auth: AuthService,
    private cartService: CartService,
    private router: Router,
    private albumService: AlbumService,
    private newsService: NewsService
  ) {
    this.isLogin = this.auth.checkLogin();
  }

  ngOnInit() {
    this.loadLatestProducts();
    this.loadCategories();
    this.loadAlbumImages();
    this.loadNews();
    this.loadTopSellingProduct();
    this.loadPopularProducts();
  }

  loadPopularProducts() {
    // Lấy tất cả sản phẩm từ API
    this.productService.getSellingProduct().subscribe(
      (data) => {
        this.popularProducts = data || []; // Nếu data là null, gán cho nó mảng rỗng
        console.log(this.popularProducts);
      },
      (error) => {
        console.error('Lỗi khi tải sản phẩm phổ biến:', error);
        this.popularProducts = []; // Gán mảng rỗng nếu có lỗi
      }
    );
  }

  loadLatestProducts() {
    this.productService.getLatestProducts().subscribe((data) => {
      this.products = data; // Gán sản phẩm mới nhất
      console.log(this.products); // Xem sản phẩm mới nhất

      // Tải tên nhà sản xuất cho từng sản phẩm
      this.products.forEach((product) => {
        this.loadManufacturerName(product.id_nhasx, product.id); // Gọi hàm để lấy tên nhà sản xuất theo id_nhasx
      });
    });
  }

  loadManufacturerName(id_nhasx: string, productId: string) {
    this.categoryService.getManufacturerById(id_nhasx).subscribe(
      (data) => {
        this.manufacturerNames[productId] = data.ten; // Lưu tên nhà sản xuất vào đối tượng theo id sản phẩm
        // console.log('Nhà sản xuất cho sản phẩm ID ' + productId + ':', this.manufacturerNames[productId]);
      },
      (error) => {
        console.error('Lỗi khi tải nhà sản xuất:', error);
      }
    );
  }

  loadTopSellingProduct() {
    this.productService.getTopSellingProduct().subscribe((data) => {
      if (data) {
        this.topSellingProduct = data;
        console.log('Sản phẩm bán chạy nhất:', this.topSellingProduct);

        // Lấy tên nhà sản xuất
        this.loadManufacturerName(
          this.topSellingProduct.id_nhasx,
          this.topSellingProduct.id
        );
      } else {
        console.error('Không tìm thấy sản phẩm bán chạy');
      }
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data as Category[];
    });
  }

  loadAlbumImages() {
    this.albumService.getAlbumImages().subscribe((data) => {
      this.albumImages = data;
    });
  }

  loadNews() {
    this.newsService.getNews().subscribe((data) => {
      this.newsArticles = data;
    });
  }

  get paginatedCategories() {
    const startIndex = this.currentPage * this.itemsPerPage;
    return this.categories.slice(startIndex, startIndex + this.itemsPerPage);
  }

  hasNext(): boolean {
    return (this.currentPage + 1) * this.itemsPerPage < this.categories.length;
  }

  hasPrev(): boolean {
    return this.currentPage > 0;
  }

  nextPage() {
    if (this.hasNext()) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.hasPrev()) {
      this.currentPage--;
    }
  }

  addToCart(product: Product) {
    const size = this.selectedSize[product.id];
    if (!size) {
      alert('Vui lòng chọn kích cỡ.');
      return;
    }

    const productToAdd = {
      ...product,
      size: size, // Lưu kích cỡ vào đối tượng sản phẩm
    };

    // Gọi CartService để thêm sản phẩm vào giỏ hàng
    this.cartService.addCart(productToAdd); // Đảm bảo bạn sử dụng đúng phương thức
    this.successMessage = 'Đã thêm sản phẩm vào giỏ hàng';
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  goToProductList(id_nhasx: number) {
    this.router.navigate(['/product-category', id_nhasx]); // Chuyển hướng đến danh sách sản phẩm theo id_nhasx
  }
}

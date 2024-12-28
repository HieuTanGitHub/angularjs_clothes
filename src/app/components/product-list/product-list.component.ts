import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products!: Product[]; // Khai báo mảng sản phẩm
  searchKeyword: string = ''; // Từ khóa tìm kiếm
  filteredProducts: Product[] = []; // Mảng chứa kết quả tìm kiếm

  currentPage = 1;
  itemsPerPage = 5; // Số lượng mục trên mỗi trang
  totalPages = 0; // Tổng số trang


  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts(); // Gọi phương thức để tải danh sách sản phẩm
  }

  loadProducts(): void {
    this.productService.getAll().subscribe((data) => {
      this.products = data;
      this.filterProducts(); // Áp dụng tìm kiếm ngay khi tải danh sách người dùng
    });
  }

  filterProducts(): void {
    if (!this.searchKeyword) {
      this.filteredProducts = this.products; // Nếu không có từ khóa tìm kiếm, hiển thị tất cả
    } else {
      const keyword = this.searchKeyword.toLowerCase();
      this.filteredProducts = this.products.filter(sp =>
        sp.ten.toLowerCase().includes(keyword)
      );
    }
    this.totalPages = Math.ceil(
      this.filteredProducts.length / this.itemsPerPage
    ); // Cập nhật tổng số trang
  }


  getPaginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  onSearch(event: Event): void {
    event.preventDefault();
    this.currentPage = 1; // Reset về trang đầu tiên
    this.filterProducts(); // Gọi phương thức lọc tài khoản
  }

  deleteProduct(id: string): void {
    const result = confirm("Bạn có muốn xóa sản phẩm này không?");
    if (result) {
      this.productService.delete(id).subscribe(data => {
        console.log(data);
        this.loadProducts(); // Tải lại danh sách sản phẩm sau khi xóa
      }, error => {
        console.error('Error deleting product:', error); // Xử lý lỗi nếu có
      });
    }
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}

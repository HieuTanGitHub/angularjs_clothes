import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product_category',
  templateUrl: './product_category.component.html',
  styleUrls: ['./product_category.component.css']
})
export class Product_categoryComponent implements OnInit {
  products!: Product[]; // Danh sách tất cả sản phẩm
  filteredProducts!: Product[]; // Danh sách sản phẩm đã lọc
  paginatedProducts!: Product[]; // Danh sách sản phẩm phân trang
  currentPage: number = 1; // Trang hiện tại
  itemsPerPage: number = 6; // Số sản phẩm mỗi trang
  totalPages: number = 0; // Tổng số trang
  pages: number[] = []; // Danh sách các số trang
  successMessage: string = ''; // Thông báo thành công
  minPrice: number = 0; // Giá tối thiểu
  maxPrice: number = Infinity; // Giá tối đa
  keyword: string = ''; // Từ khóa tìm kiếm

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe(data => {
      this.products = data as Product[];
      this.filteredProducts = [...this.products]; // Khởi tạo danh sách sản phẩm đã lọc
      this.applyFilter(); // Áp dụng bộ lọc ngay sau khi tải sản phẩm
    });
  }

  applyFilter() {
    this.filterByPrice(); // Lọc theo giá
    this.filterByKeyword(); // Lọc theo từ khóa
    this.updatePaginatedProducts(); // Cập nhật sản phẩm phân trang
  }

  filterByPrice() {
    this.filteredProducts = this.filteredProducts.filter(product => {
      return product.gia_km >= this.minPrice && product.gia_km <= this.maxPrice;
    });
  }

  filterByKeyword() {
    if (this.keyword.trim()) {
      this.filteredProducts = this.filteredProducts.filter(product =>
        product.ten.toLowerCase().includes(this.keyword.toLowerCase())
      );
    }
  }

  onInputChange(value: string) {
    this.keyword = value; // Cập nhật từ khóa tìm kiếm
    if (!value) {
      // Khi ô tìm kiếm trống, khôi phục danh sách sản phẩm đã lọc về danh sách gốc
      this.filteredProducts = [...this.products];
    } else {
      this.filterByKeyword(); // Lọc theo từ khóa khi có giá trị
    }
    this.updatePaginatedProducts(); // Cập nhật sản phẩm phân trang
  }

  onSearch() {
    this.applyFilter(); // Áp dụng bộ lọc khi nhấn tìm kiếm
  }

  sortProducts(event: any) {
    const order = event.target.value;
    if (order === 'asc') {
      this.filteredProducts.sort((a, b) => a.gia_km - b.gia_km); // Sắp xếp sản phẩm theo giá từ thấp đến cao
    } else if (order === 'desc') {
      this.filteredProducts.sort((a, b) => b.gia_km - a.gia_km); // Sắp xếp sản phẩm theo giá từ cao đến thấp
    }
    this.updatePaginatedProducts(); // Cập nhật sản phẩm phân trang sau khi sắp xếp
 }
 addToCart(product: Product) {
  this.cartService.addCart(product);
  this.successMessage = 'Sản phẩm đã được thêm vào giỏ hàng!';
  setTimeout(() => {
    this.successMessage = ''; // Xóa thông báo sau 3 giây
  }, 3000);
}

updatePaginatedProducts() {
  // Tính tổng số trang dựa trên số lượng sản phẩm đã lọc và số sản phẩm mỗi trang
  this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);

  // Tính chỉ số bắt đầu của sản phẩm trong mảng đã lọc cho trang hiện tại
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;

  // Cắt mảng sản phẩm đã lọc để chỉ lấy sản phẩm cho trang hiện tại
  this.paginatedProducts = this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);

  // Tạo danh sách các số trang
  this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
}

changePage(page: number) {
  if (page < 1 || page > this.totalPages) return; // Kiểm tra trang hợp lệ
  this.currentPage = page;
  this.updatePaginatedProducts(); // Cập nhật sản phẩm phân trang khi thay đổi trang
}

reloadProducts() {
  this.loadProducts(); // Gọi lại phương thức loadProducts để tải lại tất cả sản phẩm
  this.currentPage = 1; // Đặt lại trang hiện tại về 1
}
}


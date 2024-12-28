import { Category } from './../../models/category';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './categoy-list.component.html',
  styleUrls: ['./categoy-list.component.css'],
})
export class CategoyListComponent implements OnInit {
  categories!: Category[];
  searchKeyword: string = ''; // Từ khóa tìm kiếm
  filteredCategories: Category[] = []; // Mảng chứa kết quả tìm kiếm

  currentPage = 1;
  itemsPerPage = 5; // Số lượng mục trên mỗi trang
  totalPages = 0; // Tổng số trang

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data;
      this.filterCategories(); // Áp dụng tìm kiếm ngay khi tải danh sách người dùng
    });
  }

  filterCategories(): void {
    if (!this.searchKeyword) {
      this.filteredCategories = this.categories; // Nếu không có từ khóa tìm kiếm, hiển thị tất cả
    } else {
      const keyword = this.searchKeyword.toLowerCase();
      this.filteredCategories = this.categories.filter(nha_sx =>
        nha_sx.ten.toLowerCase().includes(keyword)
      );
    }
    this.totalPages = Math.ceil(
      this.filteredCategories.length / this.itemsPerPage
    ); // Cập nhật tổng số trang
  }


  getPaginatedCategories(): Category[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCategories.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  onSearch(event: Event): void {
    event.preventDefault();
    this.currentPage = 1; // Reset về trang đầu tiên
    this.filterCategories(); // Gọi phương thức lọc tài khoản
  }

  deleteCategory(id: String) {
    var result = confirm('Bạn có muốn xóa danh mục này?');
    if (result) {
      this.categoryService.delete(id).subscribe(() => {
        this.loadAccounts(); // Gọi lại hàm để lấy danh sách danh mục mới
      });
    }
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}

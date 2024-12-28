import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css'],
})
export class HeadersComponent implements OnInit {
  isLogin: any;
  isADM: any;
  categories: Category[] = [];
  showDropdown: boolean = false;
  cartQnt = 0;

  constructor(
    private auth: AuthService,
    private router: Router,
    private categoryService: CategoryService,
    private cartService: CartService
  ) {
    this.isLogin = this.auth.checkLogin();
    this.isADM = this.auth.checkAdmin();
    const carts = JSON.parse(localStorage.getItem('cart') as string) || [];
    this.cartQnt = carts.length;
  }

  ngOnInit() {
    this.cartService.cartQuantity$.subscribe((quantity) => {
      this.cartQnt = quantity; // Cập nhật số lượng sản phẩm
    });

    this.categoryService.getAll().subscribe(
      (data) => {
        this.categories = data as Category[];
        console.log('Danh mục:', this.categories); // Kiểm tra danh mục trả về từ API
      },
      (error) => {
        console.error('Lỗi khi lấy danh mục:', error);
      }
    );

    if (this.isLogin) {
      console.log('Xin chào:', this.isLogin.fullname);
    }
  }

  onLogout() {
    localStorage.clear();
    location.assign('/');
  }

  selectCategory(categoryId: string) {
    this.router.navigate(['/shop'], { queryParams: { category: categoryId } });
    this.showDropdown = false; // Đóng dropdown khi chọn danh mục
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}

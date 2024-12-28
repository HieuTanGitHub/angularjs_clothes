import { Component, OnInit } from '@angular/core';
import { User } from './../../models/user';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-admin',
  templateUrl: './account-admin.component.html',
  styleUrls: ['./account-admin.component.css']
})
export class AccountAdminComponent implements OnInit {
  users!: User[];
  filteredAccounts: User[] = []; // Mảng chứa kết quả tìm kiếm
  searchKeyword: string = ''; // Từ khóa tìm kiếm
  newUser: any = {}; // Thêm người dùng mới

  currentPage = 1;
  itemsPerPage = 10; // Số lượng mục trên mỗi trang
  totalPages = 0; // Tổng số trang

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getAll().subscribe((data) => {
      this.users = data;
      this.filterAccounts(); // Áp dụng tìm kiếm ngay khi tải danh sách người dùng
    });
  }

  filterAccounts(): void {
    if (!this.searchKeyword) {
      this.filteredAccounts = this.users.filter(user => !user.isAdmin); // Loại bỏ người dùng có isAdmin = true
    } else {
      const keyword = this.searchKeyword.toLowerCase();
      this.filteredAccounts = this.users.filter(user =>
        !user.isAdmin && (
          user.fullname.toLowerCase().includes(keyword) ||
          user.name.toLowerCase().includes(keyword) ||
          user.phone.toString().includes(keyword) ||
          user.email.toLowerCase().includes(keyword)
        )
      );
    }
    this.totalPages = Math.ceil(this.filteredAccounts.length / this.itemsPerPage);
  }


  getPaginatedAccounts(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAccounts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onSearch(event: Event): void {
    event.preventDefault();
    this.currentPage = 1; // Reset về trang đầu tiên
    this.filterAccounts(); // Gọi phương thức lọc tài khoản
  }

  addUser() {
    this.users.push({ ...this.newUser });
    this.newUser = {};
  }

  deleteUser(userId: string): void {
    const user = this.users.find(u => u.id === userId);
    if (user && !user.isAdmin) {
      user.isBlocked = true;
      this.accountService.updateUser(userId, user).subscribe(
        () => {
          alert('Tài khoản đã bị chặn.');
          this.loadAccounts();
        },
        (error) => {
          console.error('Error updating user:', error);
          alert('Có lỗi xảy ra khi chặn tài khoản.');
        }
      );
    }
  }

  unblockUser(userId: string): void {
    const user = this.users.find(u => u.id === userId);
    if (user && !user.isAdmin) {
      user.isBlocked = false;
      this.accountService.updateUser(userId, user).subscribe(
        () => {
          alert('Tài khoản đã được mở chặn.');
          this.loadAccounts();
        },
        (error) => {
          console.error('Error updating user:', error);
          alert('Có lỗi xảy ra khi mở chặn tài khoản.');
        }
      );
    }
  }




  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}

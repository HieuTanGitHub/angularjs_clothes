import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute và Router
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-my-profile-edit',
  templateUrl: './my-profile-edit.component.html',
  styleUrls: ['./my-profile-edit.component.css'],
})
export class MyProfileEditComponent implements OnInit {
  user: User = new User();
  id!: string;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router // Thêm Router vào constructor
  ) {}

  ngOnInit(): void {
    // Lấy ID từ URL
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loadUser();
  }

  loadUser(): void {
    this.accountService.getById(this.id).subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }

  updateProfile(): void {
    this.accountService.updateUser(this.id, this.user).subscribe(
      (response) => {
        alert('Cập nhật thành công!');
        this.router.navigate(['/my-profile', this.id]); // Sử dụng router để điều hướng
      },
      (error) => {
        console.error('Error updating user:', error);
        alert('Cập nhật thất bại!');
      }
    );
  }
}

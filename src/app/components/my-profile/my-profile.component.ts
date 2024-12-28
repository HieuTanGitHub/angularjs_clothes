import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.less']
})
export class MyProfileComponent implements OnInit {
  user!: User;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute // Thêm ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  // Lấy thông tin người dùng theo ID
  fetchUserData(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Lấy id từ đường dẫn
    if (id) {
      this.accountService.getById(id).subscribe({
        next: (user) => {
          this.user = user; // Lưu thông tin người dùng
        },
        error: (err) => {
          console.error('Failed to fetch user data', err);
        }
      });
    }
  }

  navigateToEdit(): void {
    const id = this.user.id; // ID người dùng
    this.router.navigate(['/my-profile-edit', id]);
  }
}

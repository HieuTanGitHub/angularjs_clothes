import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  user: any; // Thông tin người dùng sẽ được tải từ dịch vụ

  constructor() {}

  ngOnInit(): void {
    // Giả sử chúng ta có thông tin người dùng từ dịch vụ
    this.user = {
      username: 'user123',
      email: 'user@example.com',
      address: '123 Main St',
      phone: '123-456-7890'
    };
  }

  saveChanges() {
    // Xử lý lưu thay đổi thông tin người dùng
    console.log('Dữ liệu người dùng đã được cập nhật:', this.user);
  }
}

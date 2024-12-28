import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'; // Import service của bạn

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]] // Validate email
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;
      this.authService.sendPasswordResetLink(email).subscribe(
        response => {
          // Xử lý phản hồi thành công
          alert('Đường dẫn thay đổi mật khẩu đã được gửi đến email của bạn.');
        },
        error => {
          // Xử lý lỗi
          console.error('Error occurred:', error);
          alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
      );
    }
  }
}

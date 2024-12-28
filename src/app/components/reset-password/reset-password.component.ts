import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(formGroup: FormGroup) {
    if (formGroup.get('newPassword')?.value !== formGroup.get('confirmPassword')?.value) {
      return { mismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      // Xử lý logic để cập nhật mật khẩu ở đây
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;
      // Gọi phương thức API để cập nhật mật khẩu
    }
  }
}

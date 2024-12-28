import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Userdn } from 'src/app/models/userdn';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userdn: Userdn;
  registerF: FormGroup;
  user: User;

  constructor(private authService : AuthService, private router : Router) {
    this.user = new User();
    this.userdn = new Userdn();
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    this.registerF = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      fullname: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rePassword: new FormControl('', Validators.required),
    }, { validators: this.passwordMatchValidator }); // Thêm validator tùy chỉnh ở đây
  }

  ngOnInit() {}

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get('password');
    const rePassword = control.get('rePassword');
    return password && rePassword && password.value !== rePassword.value ? { 'mismatch': true } : null;
  };

  onSubmit() {
    if (this.registerF.invalid) {
      alert('Vui lòng nhập hợp lệ');
      return;
    }

    const newUser = this.registerF.value;
    newUser.isAdmin = false; // Không phải admin
    newUser.isBlocked = false; // Không bị chặn

    this.authService.save(newUser).subscribe(
      (data) => {
        console.log(data);
        alert('Đăng ký thành công');
        location.assign('/login');
      },
      (error: User) => {
        console.error(error);
        alert('Đăng ký thất bại');
      }
    );
  }


  onLogin() {
    if (this.loginForm.invalid) {
      alert('Vui lòng nhập hợp lệ');
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      (res: any) => {
        if (res.error) {
          alert(res.error); // Hiển thị lỗi từ server
          return;
        }

        alert('Đăng nhập thành công');
        localStorage.setItem('login', JSON.stringify({
          loggedIn: true,
          admin: res.isAdmin,
          id: res.id,
        }));
        location.assign('/');
      },
      (error: any) => {
        console.error('Error:', error);
        alert(error.error || 'Đăng nhập thất bại');
        // Không lưu gì vào localStorage nếu thất bại
      }
    );
  }


}

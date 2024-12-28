import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Userdn } from '../models/userdn';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/users';
  loggedIn = false;

  constructor(private httpClient: HttpClient) {}

  save(user: User) {
    return this.httpClient.post(this.url, user).pipe(
      catchError((error) => {
        console.error('Error registering user:', error);
        throw error; // Ném lỗi để có thể xử lý ở nơi gọi
      })
    );
  }

  sendPasswordResetLink(email: string): Observable<any> {
    return this.httpClient.post(`${this.url}/forgot-password`, { email }).pipe(
      catchError((error) => {
        console.error('Error sending password reset link:', error);
        throw error; // Ném lỗi để có thể xử lý ở nơi gọi
      })
    );
  }

  login(userdn: Userdn) {
    return this.httpClient
      .get<any[]>(`${this.url}?name=${userdn.name}&password=${userdn.password}`)
      .pipe(
        map((users) => {
          console.log('Dữ liệu người dùng từ API:', users); // Kiểm tra dữ liệu từ API
          if (users.length === 0) {
            throw new Error('Sai tên đăng nhập hoặc mật khẩu.');
          }

          const user = users[0];
          if (user.isBlocked) {
            throw new Error('Tài khoản bị chặn.');
          }

          this.loggedIn = true;
          localStorage.setItem(
            'login',
            JSON.stringify({ loggedIn: true, admin: user.isAdmin })
          );
          return user;
        }),
        catchError((error) => {
          console.error('Error logging in:', error);
          throw error;
        })
      );
  }

  checkLogin() {
    const jsonData = localStorage.getItem('login');
    if (jsonData) {
      const userData = JSON.parse(jsonData);
      console.log('Dữ liệu từ localStorage:', userData); // Debug thông tin từ localStorage
      return userData;
    }
    return false;
  }

  checkAdmin() {
    const jsonData = localStorage.getItem('login');
    if (jsonData) {
      const userData = JSON.parse(jsonData);
      return userData.admin === true; // Kiểm tra giá trị admin
    }
    return false;
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      const jsonData = localStorage.getItem('login');
      if (jsonData) {
        try {
          const userData = JSON.parse(jsonData);
          resolve(userData.loggedIn === true);
        } catch (error) {
          console.error('Error parsing login data:', error);
          resolve(false);
        }
      } else {
        resolve(false);
      }
    });
  }

  isAdmin() {
    const promise = new Promise<boolean>((resolve, reject) => {
      let jsonData = localStorage.getItem('login');
      if (jsonData) {
        if (JSON.parse(jsonData).isAdmin == true) {
          this.loggedIn = true;
          resolve(this.loggedIn);
        }
      } else {
        resolve(this.loggedIn);
      }
    });
    return promise;
  }
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url).pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(error);
      })
    );
  }

  // Phương thức để lấy ID của người dùng đang đăng nhập
  getLoggedInUserId(): string | null {
    const jsonData = localStorage.getItem('login');
    return jsonData ? JSON.parse(jsonData).id : null;
  }
}

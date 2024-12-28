import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

    // Lấy tất cả người dùng
  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.url}/users`);
  }

  getById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/users/${id}`);
  }

  // Cập nhật thông tin người dùng theo ID
  updateUser(id: string, user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.url}/users/${id}`, user);
  }
  validatePassword(id: string, password: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.url}/users/validate-password`, { id, password });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost:3000/news'; // Địa chỉ API của bạn

  constructor(private http: HttpClient) {}

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl); // Gọi API và trả về dữ liệu tin tức
  }
  getNewsDetail(id: string): Observable<News> {
    return this.http.get<News>(`${this.apiUrl}/${id}`);
  }

}

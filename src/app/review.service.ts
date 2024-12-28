import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'assets/db.json'; // Đường dẫn đến db.json

  constructor(private http: HttpClient) { }

  getReviews(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addReview(review: any): Observable<any> {
    // Logic để thêm đánh giá mới vào db.json (nếu cần)
    // Lưu ý: db.json thường là tệp tĩnh, bạn có thể cần một API để lưu dữ liệu
    return this.http.post<any>(this.apiUrl, review);
  }
}

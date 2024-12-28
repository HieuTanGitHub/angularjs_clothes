// src/app/services/review.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../../app/models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'https://api.example.com/reviews'; // Thay đổi URL cho phù hợp

  constructor(private http: HttpClient) {}

  getReviews(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}?productId=${productId}`);
  }

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review);
  }
}

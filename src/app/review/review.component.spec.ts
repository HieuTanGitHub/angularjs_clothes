// src/app/services/review.service.ts
import { Injectable } from '@angular/core';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviews: Review[] = []; // Mảng lưu trữ đánh giá

  constructor() {}

  // Lấy tất cả đánh giá cho sản phẩm
  getReviews(productId: number): Review[] {
    return this.reviews.filter(review => review.productId === productId);
  }

  // Thêm đánh giá mới
  addReview(review: Review): void {
    this.reviews.push(review);
  }
}

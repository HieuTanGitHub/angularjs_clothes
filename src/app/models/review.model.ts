// src/app/models/review.model.ts
export interface Review {
  id: number;
  productId: number;
  customerName: string;
  rating: number; // Đánh giá từ 1 đến 5
  comment: string;
  date: Date;
}

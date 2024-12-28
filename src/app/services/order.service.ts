import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderType } from '../models/order';
import { Product } from '../models/product'; // Import Product model
import { Review } from '../models/review'; // Import Review model
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url = 'http://localhost:3000/orders'; // Địa chỉ API cho đơn hàng
  private productUrl = 'http://localhost:3000/san_pham'; // Địa chỉ API cho sản phẩm
  private reviewUrl = 'http://localhost:3000/reviews'; // Địa chỉ API cho đánh giá

  constructor(private httpClient: HttpClient) {}

  // Phương thức thêm đơn hàng
  addOrder(order: OrderType): Observable<OrderType> {
    return this.httpClient.post<OrderType>(`${this.url}`, order);
  }

  // Phương thức lấy tất cả đơn hàng
  getOrders(): Observable<OrderType[]> {
    return this.httpClient.get<OrderType[]>(this.url);
  }

  // Phương thức đếm tổng số đơn hàng
  getTotalOrders(): Observable<number> {
    return this.httpClient.get<OrderType[]>(this.url).pipe(
      map(orders => orders.length) // Đếm số lượng phần tử trong mảng đơn hàng
    );
  }

  // Phương thức xóa đơn hàng theo ID
  deleteOrder(orderId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${orderId}`);
  }

  // Phương thức cập nhật đơn hàng
  updateOrder(
    orderId: string,
    updatedOrder: Partial<OrderType>
  ): Observable<OrderType> {
    return this.httpClient.put<OrderType>(
      `${this.url}/${orderId}`,
      updatedOrder
    );
  }

  // Phương thức lấy đơn hàng theo ID
  getOrderById(orderId: string): Observable<OrderType> {
    return this.httpClient.get<OrderType>(`${this.url}/${orderId}`);
  }

  // Phương thức lấy sản phẩm theo danh sách ID
  getProductsByIds(productIds: string[]): Observable<Product[]> {
    return this.httpClient.post<Product[]>(`${this.productUrl}/getProductsByIds`, { ids: productIds });
  }

  // Phương thức gửi đánh giá
  submitReview(review: Review): Observable<Review> {
    return this.httpClient.post<Review>(`${this.reviewUrl}`, review);
  }

  // Phương thức lấy đánh giá theo ID sản phẩm
  getReviewsByProductId(productId: string): Observable<Review[]> {
    return this.httpClient.get<Review[]>(`${this.reviewUrl}/product/${productId}`);
  }
  

}

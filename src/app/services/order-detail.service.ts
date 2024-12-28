import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDetailType } from '../models/orderDetail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailService {
  url = 'http://localhost:3000/orderDetails';

  constructor(private httpClient: HttpClient) {}

  add(orderDetail: OrderDetailType): Observable<OrderDetailType> {
    return this.httpClient.post<OrderDetailType>(this.url, orderDetail);
  }
}

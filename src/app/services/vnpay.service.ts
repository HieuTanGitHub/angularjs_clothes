import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VnpayService {
  private apiUrl = 'http://your-backend-url/vnpay'; // URL backend PHP

  constructor(private http: HttpClient) {}

  createPayment(orderInfo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/vnpay_create_payment.php`, orderInfo);
  }
}

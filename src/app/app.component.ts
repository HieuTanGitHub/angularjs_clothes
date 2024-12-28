import { Component } from '@angular/core';
import { VnpayService } from './services/vnpay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  constructor(private vnpayService: VnpayService) {}

  onPayment() {
    const orderInfo = {
      amount: 500000,
      orderDescription: 'Thanh toán đơn hàng',
    };

    // this.vnpayService.createPayment(orderInfo).subscribe(
    //   (response: any) => {
    //     if (response && response.paymentUrl) {
    //       window.location.href = response.paymentUrl;
    //     }
    //   },
    //   (error: any) => {
    //     console.error('Lỗi khi tạo thanh toán:', error);
    //   }
    // );
  }
}

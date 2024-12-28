import { Component } from '@angular/core';
import { VnpayService } from '../../services/vnpay.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent {
  orderInfo = { amount: '', orderDesc: '' };

  constructor(private vnpayService: VnpayService) {}

  // submitPayment() {
  //   this.vnpayService.createPayment(this.orderInfo).subscribe(
  //     (response) => {
  //       if (response && response.paymentUrl) {
  //         window.location.href = response.paymentUrl; // Redirect đến VNPay
  //       }
  //     },
  //     (error) => {
  //       console.error('Thanh toán thất bại', error);
  //     }
  //   );
  // }
}

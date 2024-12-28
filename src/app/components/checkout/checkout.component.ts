import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { OrderService } from 'src/app/services/order.service';
import { VnpayService } from '../../services/vnpay.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.less'],
})
export class CheckoutComponent implements OnInit {
  formCheckout!: FormGroup;
  cartList: any = JSON.parse(localStorage.getItem('cart') as string) || [];
  userLogged: any = JSON.parse(localStorage.getItem('login') as string);
  totalPrice!: number;

  constructor(
    private vnpayService: VnpayService,
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService
  ) {}

  ngOnInit(): void {
    this.totalPrice = this.cartService.handleTotalPrice();
    this.initializeForm();
  }

  private initializeForm() {
    this.formCheckout = new FormGroup({
      fullName: new FormControl(this.userLogged?.fullname || '', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl(this.userLogged?.email || '', [
        Validators.required,
        Validators.email,
      ]),
      address: new FormControl('', Validators.required),
      message: new FormControl(''),
      paymentMethod: new FormControl('cash', Validators.required),
      transactionId: new FormControl('')
    });

    this.formCheckout.get('paymentMethod')!.valueChanges.subscribe((method) => {
      if (method === 'bank') {
        this.formCheckout.get('transactionId')!.setValidators(Validators.required);
      } else {
        this.formCheckout.get('transactionId')!.clearValidators();
      }
      this.formCheckout.get('transactionId')!.updateValueAndValidity();
    });
  }

  async handleCheckout() {
    if (this.formCheckout.invalid) {
      alert('Vui lòng nhập đúng thông tin');
      return;
    }

    const { fullName, email, phone, message, address, paymentMethod, transactionId } = this.formCheckout.value;

    try {
      // Tạo đơn hàng
      const orderResponse: any = await this.orderService.addOrder({
        userId: this.userLogged?.id,
        customerName: fullName,
        address,
        phone,
        email,
        totalPrice: this.totalPrice,
        message,
        status: 0,
        createdAt: new Date().toISOString(),
        products: this.cartList.map((cart: any) => ({
          productId: cart.id,
          productName: cart.ten,  // Thêm tên sản phẩm
          productPrice: cart.gia,
          quantity: cart.so_luong,
        })), // Lưu thông tin sản phẩm vào đơn hàng
      }).toPromise();

      const orderId = orderResponse.id;

      // Thêm chi tiết đơn hàng
      const orderDetailPromises = this.cartList.map((cart: any) => {
        return this.orderDetailService.add({
          orderId: orderId,
          productId: cart.id,
          productName: cart.ten,  // Thêm tên sản phẩm vào chi tiết đơn hàng
          productPrice: cart.gia,
          quantity: cart.so_luong,
        }).toPromise();
      });

      await Promise.all(orderDetailPromises);

      // Kiểm tra phương thức thanh toán và điều hướng
      if (paymentMethod === 'bank') {
        this.processBankTransfer(transactionId);
      } else {
        alert('Đặt hàng thành công');
        this.finishOrder();
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi: ', error);
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  }

  processBankTransfer(transactionId: string) {
    console.log(`Thanh toán qua ngân hàng với mã giao dịch: ${transactionId}`);
    alert('Đặt hàng thành công qua ngân hàng');
    this.finishOrder();
  }

  finishOrder() {
    this.cartService.finishOrder();
    this.router.navigate(['/thank-you']);
  }


  onPayment() {
    const orderInfo = {
      amount: 500000,
      orderDescription: 'Thanh toán đơn hàng',
    };

    this.vnpayService.createPayment(orderInfo).subscribe(
      (response: any) => {
        if (response && response.paymentUrl) {
          window.location.href = response.paymentUrl;
        }else{
          console.error('Không nhận được URL thanh toán từ server.');
        }
      },
      (error: any) => {
        console.error('Lỗi khi tạo thanh toán:', error);
      }
    );
  }
}

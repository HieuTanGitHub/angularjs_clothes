import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  amount: number = 10000;
  orderDescription: string = '';
  constructor(
    private fb: FormBuilder,
    private vnpayService: VnpayService,
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService
  ) {
    this.formCheckout = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      message: [''],
      paymentMethod: ['', Validators.required],
      transactionId: [''],
    });
  }

  ngOnInit(): void {
    if (!this.userLogged) {
      this.router.navigate(['/login']);
      return;
    } //thêm
    this.totalPrice = this.cartService.handleTotalPrice();
    this.initializeForm();
  }
  // Hàm tạo ID cho đơn hàng
  generateOrderId(): string {
    return 'ORD' + Math.floor(Math.random() * 1000000).toString(); // Tạo ID ngẫu nhiên
  }

  // private initializeForm() {
  //   this.formCheckout = new FormGroup({
  //     fullName: new FormControl(
  //       this.userLogged?.fullname || '',
  //       Validators.required
  //     ),
  //     phone: new FormControl('', Validators.required),
  //     email: new FormControl(this.userLogged?.email || '', [
  //       Validators.required,
  //       Validators.email,
  //     ]),
  //     address: new FormControl('', Validators.required),
  //     message: new FormControl(''),
  //     paymentMethod: new FormControl('cash', Validators.required),
  //     transactionId: new FormControl(''),
  //   });

  //   this.formCheckout.get('paymentMethod')!.valueChanges.subscribe((method) => {
  //     if (method === 'bank') {
  //       this.formCheckout
  //         .get('transactionId')!
  //         .setValidators(Validators.required);
  //     } else {
  //       this.formCheckout.get('transactionId')!.clearValidators();
  //     }
  //     this.formCheckout.get('transactionId')!.updateValueAndValidity();
  //   });
  // }
  private initializeForm() {
    //thêm
    this.formCheckout.patchValue({
      fullName: this.userLogged?.fullname || '',
      email: this.userLogged?.email || '',
      paymentMethod: 'cash', // Giá trị mặc định
    });

    this.formCheckout.get('paymentMethod')!.valueChanges.subscribe((method) => {
      const transactionIdControl = this.formCheckout.get('transactionId')!; //thêm
      if (method === 'bank') {
        // this.formCheckout.get('transactionId')!.setValidators(Validators.required);
        transactionIdControl.setValidators(Validators.required);
      } else {
        // this.formCheckout.get('transactionId')!.clearValidators();
        transactionIdControl.clearValidators();
      }
      // this.formCheckout.get('transactionId')!.updateValueAndValidity();
      transactionIdControl.updateValueAndValidity();
    });
  }

  //   async handleCheckout() {
  //     if (this.formCheckout.invalid) {
  //       alert('Vui lòng nhập đúng thông tin');
  //       return;
  //     }

  //     const {
  //       fullName,
  //       email,
  //       phone,
  //       message,
  //       address,
  //       paymentMethod,
  //       transactionId,
  //     } = this.formCheckout.value;

  //     try {
  //       // Tạo đơn hàng
  //       const orderResponse: any = await this.orderService
  //       .addOrder({
  //         id: this.generateOrderId(), // Tạo ID cho đơn hàng, nếu bạn có hàm này
  //         userId: this.userLogged?.id,
  //         customerName: fullName,
  //         address,
  //         phone,
  //         email,
  //         totalPrice: this.totalPrice,
  //         message,
  //         status: 0, // Trạng thái đơn hàng, có thể là "chưa thanh toán", hoặc "chờ xử lý", v.v.
  //         createdAt: new Date().toISOString(),
  //         item: this.cartList.map((cart: any) => cart.ten).join(', '), // Tên các sản phẩm trong đơn hàng
  //         quantity: this.cartList.reduce((total: number, cart: any) => total + cart.so_luong, 0), // Tổng số lượng sản phẩm trong đơn hàng
  //         products: this.cartList.map((cart: any) => ({
  //           productId: cart.id,
  //           productName: cart.ten, // Tên sản phẩm
  //           productPrice: cart.gia,
  //           quantity: cart.so_luong,
  //         })), // Lưu thông tin sản phẩm vào đơn hàng
  //       })
  //       .toPromise();
  //       //lấy phản hồi từ API

  //     //Lấy id của đơn hàng từ phản hồi
  //       const orderId = orderResponse.id;

  //       // Thêm chi tiết đơn hàng
  //       const orderDetailPromises = this.cartList.map((cart: any) => {
  //         return this.orderDetailService
  //           .add({
  //             orderId: orderId,
  //             productId: cart.id,
  //             productName: cart.ten, // Thêm tên sản phẩm vào chi tiết đơn hàng
  //             productPrice: cart.gia,
  //             quantity: cart.so_luong,
  //           })
  //           .toPromise();
  //       });

  //     await Promise.all(orderDetailPromises);

  //     // Kiểm tra phương thức thanh toán và điều hướng
  //     if (paymentMethod === 'bank') {
  //       this.processBankTransfer(transactionId);
  //     } else {
  //       alert('Đặt hàng thành công');
  //       this.finishOrder();
  //     }
  //   } catch (error) {
  //     console.error('Đã xảy ra lỗi: ', error);
  //     alert('Có lỗi xảy ra, vui lòng thử lại.');
  //   }
  // }
  async handleCheckout() {
    if (this.formCheckout.invalid) {
      alert('Vui lòng nhập đúng thông tin');
      return;
    }

    const {
      fullName,
      email,
      phone,
      message,
      address,
      paymentMethod,
      transactionId,
    } = this.formCheckout.value;

    const orderData = {
      id: this.generateOrderId(),
      userId: this.userLogged?.id,
      customerName: fullName,
      address,
      phone,
      email,
      totalPrice: this.totalPrice,
      message,
      status: 0,
      createdAt: new Date().toISOString(),
      item: this.cartList.map((cart: any) => cart.ten).join(', '),
      quantity: this.cartList.reduce(
        (total: number, cart: any) => total + cart.so_luong,
        0
      ),
      products: this.cartList.map((cart: any) => ({
        productId: cart.id,
        productName: cart.ten,
        productPrice: cart.gia,
        quantity: cart.so_luong,
      })),
    };

    // console.log('Order data being sent:', orderData);  // theo dõi dữ liệu gửi đến máy chủ

    try {
      const orderResponse: any = await this.orderService
        .addOrder(orderData)
        .toPromise();
      console.log('Order response:', orderResponse); // gỡ lỗi để kiểm tra phản hồi của máy chủ

      const orderId = orderResponse.id;

      const orderDetailPromises = this.cartList.map((cart: any) => {
        return this.orderDetailService
          .add({
            orderId: orderId,
            productId: cart.id,
            productName: cart.ten,
            productPrice: cart.gia,
            quantity: cart.so_luong,
          })
          .toPromise();
      });

      await Promise.all(orderDetailPromises);

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
      amount: 500000, // Example amount
      orderDescription: 'Thanh toán mua giày',
      txnRef: 'hieutan', // Unique transaction reference
    };

    // Generate payment URL
    const paymentUrl = this.vnpayService.generatePaymentUrl(orderInfo);
    console.log('Generated Payment URL:', paymentUrl);
    //Redirect user to VNPay payment page
    if (paymentUrl) {
      window.location.href = paymentUrl;
    } else {
      console.error('Error generating payment URL.');
    }
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less'],
})
export class CartComponent {
  cartList: any = JSON.parse(localStorage.getItem('cart') as string) || [];
  totalPrice!: number;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.totalPrice = this.cartService.handleTotalPrice();
  }

  onRemoveProduct(id: string) {
    const isConfirm = confirm('Xác nhận xoá SP khỏi giỏ hàng?');

    if (isConfirm) {
      this.cartService.removeItem(id, () => {
        alert('Xoá SP thành công');

        this.cartList = this.cartList.filter((item: any) => item.id !== id);
        this.totalPrice = this.cartService.handleTotalPrice();
      });
    }
  }
  

  onIncrease(id: string) {
    this.cartService.increaseQnt(id, (newCart) => {
      this.cartList = newCart;
      this.totalPrice = this.cartService.handleTotalPrice();
    });
  }

  onDecrease(id: string) {
    this.cartService.decreaseQnt(id, (newCart) => {
      this.cartList = newCart;
      this.totalPrice = this.cartService.handleTotalPrice();
    });
  }

  onCheckout() {
    this.router.navigate(['/checkout']);
  }
}

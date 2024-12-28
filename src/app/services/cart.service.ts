import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartList: any[] = JSON.parse(localStorage.getItem('cart') as string) || [];
  private cartQuantitySubject = new BehaviorSubject<number>(this.cartList.length);
  cartQuantity$ = this.cartQuantitySubject.asObservable();

  constructor() {}

  addCart(product: any) {
    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng (bao gồm kích cỡ)
    const productExists = this.cartList.find(
      (item) => item.id === product.id && item.size === product.size
    );

    if (productExists) {
      productExists.so_luong += 1; // Tăng số lượng
    } else {
      product.so_luong = 1; // Đặt số lượng mặc định là 1
      this.cartList.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(this.cartList));
    this.cartQuantitySubject.next(this.cartList.length); // Cập nhật số lượng
  }


  removeItem(id: string, next: () => void) {
    const newCart = this.cartList.filter((item) => item.id !== id);
    this.cartList = newCart; // Cập nhật cartList

    localStorage.setItem('cart', JSON.stringify(this.cartList));
    this.cartQuantitySubject.next(this.cartList.length); // Cập nhật số lượng

    next();
  }

  increaseQnt(cartId: string, next: (cart: any) => void) {
    const existsProduct = this.cartList.find((item) => item.id === cartId);

    if (existsProduct) existsProduct.so_luong++;

    localStorage.setItem('cart', JSON.stringify(this.cartList));
    this.cartQuantitySubject.next(this.cartList.length); // Cập nhật số lượng

    next(this.cartList);
  }

  decreaseQnt(cartId: string, next: (carts: any) => void) {
    const existsProduct = this.cartList.find((item) => item.id === cartId);

    if (existsProduct) {
      if (existsProduct.so_luong <= 1) {
        this.cartList = this.cartList.filter((item) => item.id !== cartId);
      } else {
        existsProduct.so_luong--;
      }
      localStorage.setItem('cart', JSON.stringify(this.cartList));
      this.cartQuantitySubject.next(this.cartList.length); // Cập nhật số lượng

      next(this.cartList);
    }
  }

  handleTotalPrice() {
    const totalPrice = this.cartList.reduce((total: number, cart: any) => {
      return total + cart.so_luong * cart.gia;
    }, 0);

    return totalPrice;
  }

  finishOrder() {
    localStorage.removeItem('cart');
    this.cartList = []; // Đặt lại cartList
    this.cartQuantitySubject.next(0); // Cập nhật số lượng về 0
  }
}

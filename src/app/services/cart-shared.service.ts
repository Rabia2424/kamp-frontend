import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartSharedService {
  private cartItemsSource = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSource.asObservable();

  updateCartItems(cartItems: CartItem[]) {
    this.cartItemsSource.next(cartItems);
  }
}

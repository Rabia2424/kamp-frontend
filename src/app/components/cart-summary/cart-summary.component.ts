import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CartSharedService } from '../../services/cart-shared.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule,
    RouterModule
  ],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css',
})
export class CartSummaryComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartItem: CartItem;
  constructor(
    private cartService: CartService,
    private toastrService: ToastrService,
    private cartSharedService: CartSharedService
  ) {}

  ngOnInit(): void {
    this.cartSharedService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
    this.getCart();
  }

  getCart() {
    this.cartService.list().subscribe((response) => {
      this.cartItems = response;
      this.cartSharedService.updateCartItems(this.cartItems);
    });
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.getCart().subscribe((cart) => {
      let item = cart.cartItems.find(c=>c.productId == cartItem.productId);
      if(item){
        console.log(item);
        this.cartService.removeFromCart(item).subscribe((response) => {
          if (response.success) {
            this.toastrService.success(response.message);
            //this.getCart();
            let index = this.cartItems.findIndex(c=>c.productId == item.productId);
            if(index!==-1){
              this.cartItems.splice(index,1);
            }
            this.cartSharedService.updateCartItems(this.cartItems);
          } else {
            this.toastrService.error(response.message);
          }
        });
      }
    });
  }
}

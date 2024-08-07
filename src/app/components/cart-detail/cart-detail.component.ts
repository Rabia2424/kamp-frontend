import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../services/cart.service';
import { CartSharedService } from '../../services/cart-shared.service';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [CommonModule,
    RouterModule
  ],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.css',
})
export class CartDetailComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private cartSharedService: CartSharedService,
    private toastrService:ToastrService,
    private categoryService:CategoryService
  ) {}

  ngOnInit(): void {
    this.cartSharedService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
    this.getCart();
    this.loadCategories();
  }
  cartItems: CartItem[] = [];
  categories: Category[] = [];

  getCart() {
    this.cartService.list().subscribe((response) => {
      this.cartItems = response;
      this.cartSharedService.updateCartItems(this.cartItems);
      //console.log(this.cartItems);
    });
  }

  loadCategories(){
    this.categoryService.getCategories().subscribe(response=>{
      this.categories = response.data;
    })
  }
  
  getCategoryName(cartItem:CartItem):string{
    let category = this.categories.find(c=>c.categoryId == cartItem.product?.categoryId);
    return category ? category.categoryName : "Unknown";
  }

  getTotalAmount() {
    return this.cartItems.reduce((total, item) => {
      return total + (item.quantity * (item.product?.unitPrice?? 0));
    }, 0);
  }

  addToCartItem(cartItem:CartItem){
    this.cartService.getCart().subscribe((cart)=>{
      var item = cart.cartItems.find(c=>c.productId == cartItem.productId);
      if(item){
        item.quantity++;
        this.cartService.updateCart(cart).subscribe(response=>{
          this.toastrService.success(response.message);
          this.getCart();
        })
      }
    })
  }

  removeFromCart(cartItem:CartItem){
    this.cartService.getCart().subscribe((cart)=>{
      var item = cart.cartItems.find(c=>c.productId == cartItem.productId)
      if(item){
        this.cartService.removeFromCart(item).subscribe(response=>{
          this.toastrService.success(response.message);
          if(this.cartItems){
            const index = this.cartItems.findIndex(c=>c.productId == item?.productId);
            if(index!==-1){
              this.cartItems.splice(index,1);
              this.cartSharedService.updateCartItems(this.cartItems);
            }
          }
        })
      }
    })
  }

  deleteFromCartItem(cartItem:CartItem){
    this.cartService.getCart().subscribe((cart)=>{
      var item = cart.cartItems.find(c=>c.productId == cartItem.productId);
      if(item){
        item.quantity--;
        this.cartService.updateCart(cart).subscribe(response=>{
          this.toastrService.success(response.message);
          this.getCart();
        })
      }
    })
  }
}

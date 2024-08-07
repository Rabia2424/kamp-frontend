import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

import { VatAddedPipe } from '../../pipes/vat-added.pipe';
import { FormsModule } from '@angular/forms';
import { FilterPipePipe } from '../../pipes/filter-pipe.pipe';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cartItem';
import { CategoryComponent } from '../category/category.component';
import { NaviComponent } from '../navi/navi.component';
import { CartSharedService } from '../../services/cart-shared.service';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    VatAddedPipe,
    FormsModule,
    FilterPipePipe,
    CategoryComponent,
    NaviComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  dataLoaded = false;
  filterText = '';
  cartItems: CartItem[] = [];

  // productResponseModel:ProductResponseModel={
  //   data : this.products,
  //   message:"",
  //   success:true
  // };

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService,
    private cartSharedService:CartSharedService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId']) {
        this.getProductsByCategory(params['categoryId']);
      } else {
        this.getProducts();
      }
    });
  }

 
  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      this.dataLoaded = true;
    });
  }

  getProductsByCategory(categoryId: number) {
    this.productService
      .getProductsByCategory(categoryId)
      .subscribe((response) => {
        this.products = response.data;
        this.dataLoaded = true;
      });
  }

  //   addToCart(product: Product) {
  //     let existingItem = this.cartItems.find(
  //       (c) => c.productId == product.productId
  //     );
  //     if (existingItem) {
  //       existingItem.quantity++;
  //       this.cartService.updateCart(existingItem).subscribe((response) => {
  //         this.toastrService.success("Cart");
  //         this.cartSharedservice.changeCartItems(this.cartItems);
  //       });
  //     } else {
  //       let cartItem = new CartItem();
  //       cartItem.productId = product.productId;
  //       cartItem.quantity = 1;
  //       // cartItem.cartId = 0;
  //       cartItem.product = product;
  //       // cartItem.cart = null;
  //       // cartItem.id = 0;
  //       this.cartService.addToCart(cartItem).subscribe((response) => {
  //         this.toastrService.success(response.message);
  //         this.cartItems.push(cartItem);
  //         this.cartSharedservice.changeCartItems(this.cartItems);
  //       });
  //     }
  //   }

  addToCart(product: Product) {
    // Mevcut sepeti al
    this.cartService.getCart().subscribe((cart) => {
      // Sepetteki öğeyi bul
      let existingItem = cart.cartItems.find(
        (c) => c.productId == product.productId
      );
      if (existingItem) {
        // Sepette mevcutsa miktarı artır
        existingItem.quantity++;
      } else {
        // Sepette yoksa yeni bir CartItem oluştur
        let cartItem = new CartItem();
        cartItem.productId = product.productId;
        cartItem.quantity = 1;
        cartItem.product = product;
        cart.cartItems.push(cartItem);
        this.cartService.addToCart(cartItem).subscribe((response) => {
                  //this.toastrService.success(response.message);
                  this.cartSharedService.updateCartItems(cart.cartItems);
                });
      }

      // Sepeti güncelle
      this.cartService.updateCart(cart).subscribe((response) => {
        this.toastrService.success(response.message);
        this.cartSharedService.updateCartItems(cart.cartItems);
      });
    });
  }

}

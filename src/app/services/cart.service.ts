import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cartItem';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models/cart';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/ListResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient:HttpClient) {}

  apiUrl="https://localhost:44384/api/";

  addToCart(cartItem:CartItem):Observable<ResponseModel> {
   let newPath = this.apiUrl + "carts/addtocart";
   return this.httpClient.post<ResponseModel>(newPath,cartItem);
  }

  getCart(): Observable<Cart> {
    let newPath = this.apiUrl + "carts/getcart";
    return this.httpClient.get<Cart>(newPath);
  }

  updateCart(cart:Cart):Observable<ResponseModel> {
    let newPath = this.apiUrl + "carts/updatecartitem";
    return this.httpClient.post<ResponseModel>(newPath,cart);
   }

  list():Observable<CartItem[]>{
    let newPath = this.apiUrl + "carts/getcartbyuserid";
    return this.httpClient.get<CartItem[]>(newPath);
  }

  removeFromCart(cartItem:CartItem):Observable<ResponseModel>{
    let newPath = this.apiUrl + "carts/removefromcart";
    return this.httpClient.post<ResponseModel>(newPath,cartItem);
  }

}

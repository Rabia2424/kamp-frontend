import { Cart } from "./cart";
import { Product } from "./product";

export class CartItem{
    id:number;
    productId:number;
    cartId:number;
    product:Product|null;
    cart:Cart|null;
    quantity:number;
}
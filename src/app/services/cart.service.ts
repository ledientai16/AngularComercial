import { Injectable } from '@angular/core';
import { CartItem } from '../cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems : CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  quantity: Subject<number> = new Subject<number>();
  constructor() { }

  addToCart(theCartItem : CartItem) {
    let existingCartItem : CartItem | undefined;
    
    if (this.cartItems.length > 0) { 
      existingCartItem = this.cartItems.find(element => element.id == theCartItem.id)
    } 
    if (existingCartItem != undefined) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    } 
    this.computeCartTotal();
  }
  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if (theCartItem.quantity == 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotal();
    }

    this.computeCartTotal(); 
  }

  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(
      tempCartItem => theCartItem.id == tempCartItem.id
    );

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
    }
  } 
  computeCartTotal () {
    let totalQuantityValue : number = 0;
    let totalPriceValue : number = 0;

    for (let tempCart of this.cartItems) {
      totalPriceValue += (tempCart.unitPrice * tempCart.quantity);
      totalQuantityValue += tempCart.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.quantity.next(totalQuantityValue);
  }

}

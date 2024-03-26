import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterModule, RouterOutlet} from '@angular/router';
import { CartItem } from '../../cart-item';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [ 
    RouterOutlet, RouterModule, CommonModule],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit{
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService : CartService) {

  }

  ngOnInit(){
    this.listCardDetails(); 
  }

  listCardDetails() {
    this.cartItems = this.cartService.cartItems;

    this.cartService. totalPrice.subscribe(
      data => this.totalPrice = data
    ) 

    this.cartService.quantity.subscribe(
      data => this.totalQuantity = data
    )
    
    this.cartService.computeCartTotal();
  }

  // incrementQuantity(theCartItem: CartItem) {
  //    this.cartService.addToCart(theCartItem)
  // }
}

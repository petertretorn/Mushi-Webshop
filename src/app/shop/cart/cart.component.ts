import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '@app/core/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private router: Router,
    public cartService: ShoppingCartService) { }

  ngOnInit() {
  }

  checkOut() {
    console.log('checking out')
  }
}

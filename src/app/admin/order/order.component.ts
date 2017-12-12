import { Component, OnInit } from '@angular/core';
import { OrderService } from '@app/core/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: any[]

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders
    })
  }

}

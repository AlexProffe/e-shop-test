import {Component, Input, OnInit} from '@angular/core';
import {Link} from "../app.component";

@Component({
  selector: 'app-cart-count',
  templateUrl: './cart-count.component.html',
  styleUrls: ['./cart-count.component.scss']
})
export class CartCountComponent implements OnInit {

  @Input()
  public link : Link

  constructor() { }

  ngOnInit(): void {
  }

}

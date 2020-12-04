import { Component, Input, OnInit } from '@angular/core';
import { Icon } from '../../Icon';
import { Link } from '../../Link';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  @Input()
  public icon: Icon;

  @Input()
  public link: Link;

  @Input()
  public count: number;

  ngOnInit(): void {}
}

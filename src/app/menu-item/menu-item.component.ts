import {Component, Input, OnInit} from '@angular/core';
import {Link} from "../app.component";

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input()
  public menuLink : Link

  constructor() { }

  ngOnInit(): void {
  }

}

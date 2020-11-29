import { Component, OnInit } from '@angular/core';
import {Icon, Link} from "../app.component";

@Component({
  selector: 'app-header-panel',
  templateUrl: './header-panel.component.html',
  styleUrls: ['./header-panel.component.scss']
})
export class HeaderPanelComponent implements OnInit {

  public wishlistCount : number = 3;

  public loginIcon : Icon = {
    class: 'fa fa-sign-in'
  }
  public loginLink: Link = {
    url: '#',
    title: 'Sign in',
    target:'_self',
    class:'account__login link--hover--big',
  }
  public wishlistIcon : Icon = {
    class: 'fa fa-heart'
  }
  public wishlistLink: Link = {
    url: '#',
    title: 'Sign in',
    target:'_self',
    class:'',
  }

  constructor() { }

  ngOnInit(): void {
  }

}

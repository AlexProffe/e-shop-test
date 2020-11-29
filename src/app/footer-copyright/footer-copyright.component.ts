import { Component, OnInit } from '@angular/core';
import {Link} from "../app.component";

@Component({
  selector: 'app-footer-copyright',
  templateUrl: './footer-copyright.component.html',
  styleUrls: ['./footer-copyright.component.scss']
})
export class FooterCopyrightComponent implements OnInit {

  public footerLink : Link = {
    url: 'https://github.com/AlexProffe',
    target: '_blank',
    class:'footer__copyright__link',
    title: 'Alex'
  }

  constructor() { }

  ngOnInit(): void {
  }

}

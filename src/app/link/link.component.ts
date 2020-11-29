import { Component,Input, OnInit } from '@angular/core';
import {Image, Link} from "../app.component";

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {

  @Input()
  public link : Link



  constructor() { }

  ngOnInit(): void {
  }

}

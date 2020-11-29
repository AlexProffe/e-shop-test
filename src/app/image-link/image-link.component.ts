import { Component,Input, OnInit } from '@angular/core';
import {Image, Link} from "../app.component";

@Component({
  selector: 'app-image-link',
  templateUrl: './image-link.component.html',
  styleUrls: ['./image-link.component.scss']
})
export class ImageLinkComponent implements OnInit {

  @Input()
  public image : Image
  @Input()
  public link : Link

  constructor() { }

  ngOnInit(): void {
  }

}

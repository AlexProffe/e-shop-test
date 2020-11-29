import {Component, Input, OnInit} from '@angular/core';
import {Image} from "../app.component";

@Component({
  selector: 'app-home-slider-item',
  templateUrl: './home-slider-item.component.html',
  styleUrls: ['./home-slider-item.component.scss']
})
export class HomeSliderItemComponent implements OnInit {

  @Input()
  public item : Image
  @Input()
  public count : number


  constructor() { }

  ngOnInit(): void {
  }

}

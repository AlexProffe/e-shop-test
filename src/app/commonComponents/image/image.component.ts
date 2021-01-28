import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../Interfaces/Image';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  @Input()
  public image: Image;

  ngOnInit(): void {}
}

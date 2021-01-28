import { Component, Input, OnInit } from '@angular/core';
import { Link } from '../../Interfaces/Link';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit {
  @Input()
  public link: Link;

  ngOnInit(): void {}
}

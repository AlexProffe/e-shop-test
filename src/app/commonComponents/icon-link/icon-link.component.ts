import { Component, Input, OnInit } from '@angular/core';
import { Link } from '../../Link';
import { Icon } from '../../Icon';

@Component({
  selector: 'app-icon-link',
  templateUrl: './icon-link.component.html',
  styleUrls: ['./icon-link.component.scss'],
})
export class IconLinkComponent implements OnInit {
  @Input()
  public link: Link;

  @Input()
  public icon: Icon;

  ngOnInit(): void {}
}

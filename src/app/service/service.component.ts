import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent {
  @Input()
  public test: string;

  @Output()
  public output: EventEmitter<string> = new EventEmitter<string>();

  public clickButton() {
    this.test = 'Test 4';
    this.output.emit('New Value');
  }
}

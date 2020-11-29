import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {CRUDServiceService} from "./crudservice.service";
import {Book} from "./Book";
import {AuthService} from "./auth.service";

export interface Image{
  url: string;
  alt: string
}
export interface Link {
  url: string,
  title: string,
  target: string,
  class: string,
}
export interface Icon {
  class: string,
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})



export class AppComponent {
  title = 'FirstAngApp';
  public test : [string,string] = ['Hello World!!', 'Test'];
  public isChildClosed: boolean = false
  public testString: string = 'Test';

  public clickButton(){
    this.isChildClosed = true;

  }


  constructor(private crudService: CRUDServiceService, public authService: AuthService) {

  }
  public  addObject() : void {
    this.crudService.createEntity('books', {name: 'newBook'})
      .subscribe( (value: string) => console.log(value))
  }
  public createObject () : void {
    this.crudService.getData<Book>('books').subscribe( (value:Book[]) => console.log(value))
  }
  public updateObject() : void {
    this.crudService.updateObject('books', 'jo3yUVUPiEOs5ZyWS61K').subscribe()
  }
  public deleteObject() : void {
    this.crudService.deleteObject('books', 'jo3yUVUPiEOs5ZyWS61K').subscribe()
  }
  public login() : void {
    this.authService.googleAuth().subscribe();
  }
}


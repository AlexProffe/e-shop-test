import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase';
import { CRUDServiceService } from './crudservice.service';
import { Book } from './Book';
import { AuthService } from './auth.service';
import { StoreService } from './store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'FirstAngApp';

  public test: [string, string] = ['Hello World!!', 'Test'];

  public isChildClosed = false;

  public user: firebase.User;

  public testString = 'Test';

  public clickButton(): void {
    this.isChildClosed = true;
  }

  public navigate(): void {
    this.router.navigate(['home']);
  }

  constructor(
    private crudService: CRUDServiceService,
    public authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private storeService: StoreService,
  ) {}

  public addObject(): void {
    this.crudService.createEntity('books', { name: 'newBook' }).subscribe((value: string) => {});
  }

  public createObject(): void {
    this.crudService.getData<Book>('books').subscribe((value: Book[]) => {});
  }

  public updateObject(): void {
    this.crudService.updateObject('books', 'jo3yUVUPiEOs5ZyWS61K', 'name').subscribe();
  }

  public deleteObject(): void {
    this.crudService.deleteObject('books', 'jo3yUVUPiEOs5ZyWS61K').subscribe();
  }

  public login(): void {
    this.authService.googleAuth().subscribe();
  }

  public logout(): void {
    this.authService.signOut().subscribe((value) => {});
  }

  ngOnInit() {
    this.storeService.user$.subscribe((value: firebase.User) => {
      this.user = value;
    });
  }
}

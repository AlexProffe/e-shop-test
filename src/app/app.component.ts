import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CRUDServiceService } from './crudservice.service';
import { Book } from './Book';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'FirstAngApp';

  public test: [string, string] = ['Hello World!!', 'Test'];

  public isChildClosed = false;

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
  ) {
    console.log(this.activeRoute);
  }

  public addObject(): void {
    this.crudService
      .createEntity('books', { name: 'newBook' })
      .subscribe((value: string) => console.log(value));
  }

  public createObject(): void {
    this.crudService.getData<Book>('books').subscribe((value: Book[]) => console.log(value));
  }

  public updateObject(): void {
    this.crudService.updateObject('books', 'jo3yUVUPiEOs5ZyWS61K').subscribe();
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
}

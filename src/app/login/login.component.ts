import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { AuthService } from '../auth.service';
import { StoreService } from '../store.service';
import { CRUDServiceService } from '../crudservice.service';
import {Shop} from "../Shop";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public user: firebase.User;

  constructor(
    public authService: AuthService,
    private router: Router,
    public storeService: StoreService,
    private crudServiceService: CRUDServiceService,
  ) {}

  ngOnInit(): void {}

  public login(): void {
    this.authService.googleAuth().subscribe((value) => {
      console.log(value);
    });
    setTimeout(() => {
      this.storeService.user$.subscribe((value: firebase.User) => {
        this.user = value;
        this.crudServiceService
          .getQueryMultipleData('shops', {
            firstFieldPath: 'userID',
            firstValue: this.user.uid,
            secondFieldPath: 'status',
            secondValue: 'saved',
          })
          .subscribe((value1: Shop[]) => {
            this.crudServiceService
              .updateCartObject('shops', value1[0].id, { value: 'active' })
              .subscribe((value2) => console.log(value2));
          });
      });
    }, 2500);
    this.router.navigate(['/']);
  }
}

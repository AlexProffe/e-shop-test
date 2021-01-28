import { Injectable } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.af.authState.pipe(
      map((auth) => {
        if (!auth) {
          this.router.navigate(['/']);
          console.log('False');
          return false;
        }
        return true;
      }),
    );
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private af: AngularFireAuth,
  ) {}
}

import { Injectable } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map((value) => !!value),
      tap((isLogged) => {
        if (!isLogged) {
          console.log('You are not prepared');
        }
      }),
    );
  }

  constructor(private authService: AuthService, private router: Router) {}
}

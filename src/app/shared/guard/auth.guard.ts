
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

// import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as AfAuth from '@angular/fire/auth';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  afAuth = AfAuth

  constructor(
    private router: Router,
    private auth: Auth
    ) { }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Promise<boolean | UrlTree> | boolean | UrlTree {

      return new Promise((resolve, reject) => {
          this.afAuth.onAuthStateChanged(this.auth, (user) => {
              if (user) {
                resolve(true);
              } else {
                console.log('Auth Guard: user is not logged in');
                this.router.navigate(['/login']);

                resolve(false);
              }
          });
      });
  }


}

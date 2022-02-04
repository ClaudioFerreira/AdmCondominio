import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as AfAuth from '@angular/fire/auth';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  afAuth = AfAuth

  constructor(
    private router: Router,
    private toaster: ToastrService,
    private auth: Auth
  ) { }

  loginUser(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(this.auth ,email, password)
    .then(user => {
      console.log(user)
      this.router.navigate(['/dashboard'])
    })
    .catch(error => {
      this.toaster.error('Tente novamente mais tarde', 'Algo deu errado')
    })
  }

  logoutUser() {
    this.afAuth.signOut(this.auth)
    .then(_ => {
      this.router.navigate(['/login'])
    })
    .catch(error => {
      this.toaster.error('Tente novamente mais tarde', 'Algo deu errado')
    })
  }
}

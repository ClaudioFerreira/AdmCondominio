import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../shared/services/auth.service';

import * as AfAuth from '@angular/fire/auth';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  afAuth = AfAuth

  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,

    private router: Router,
    private auth: Auth
  ) { }

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.log(`Login component: user is logged in, id = ${user.uid}`)
        this.router.navigate(['/dashboard'])
      }
  });
  }

  loginUser() {
    if (this.loginForm.invalid) {
      this.toastr.warning('Informações invalidas', 'Ops')

      return
    }

    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password)
  }
}

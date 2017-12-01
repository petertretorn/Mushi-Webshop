import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;
  errorMsg: string;

  constructor(private authService: AuthService, private router: Router) { }

  signIn() {
    this.authService.emailLogin(this.email, this.password)
      .then(resolve => this.router.navigate(['admin']))
      .catch(error => {
        this.errorMsg = error.message
        console.log('login failed')
      });
  }
}


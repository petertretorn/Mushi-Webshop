import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '@app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private thisDialogRef: MatDialogRef<LoginComponent>, 
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.thisDialogRef.close()
    this.authService.emailLogin(this.email, this.password)
      .then(resolve => this.router.navigate(['/admin/products-list']))
      .catch(error => {
        console.log(`login failed : ${error.message}`)
      });
  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }
}

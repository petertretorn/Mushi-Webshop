import { AuthService } from '@app/core/auth.service';
import { LoginComponent } from '@app/shared/login/login.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '@app/core/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin: boolean = false
  isAuthenticated: boolean = false

  constructor(
    private dialog: MatDialog,
    public auth: AuthService, 
    private  router: Router,
    public cartService: ShoppingCartService) { }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      if (user) {
        console.log('inside subscriber!!!')
        this.isAdmin = user.isAdmin
      }
    })
  }

  loginAdmin() {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed`);
    })
  }

  gotoHome() {
    console.log('clicking')
    this.router.navigate(['/'])
  }

  gotoCart() {
    this.router.navigate(['/cart'])
  }

  signOut() {
    this.auth.signOut()
    this.isAdmin = false;
  }
  
}

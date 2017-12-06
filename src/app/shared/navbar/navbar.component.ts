import { AuthService } from '@app/core/auth.service';
import { LoginComponent } from '@app/shared/login/login.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin: boolean = false

  constructor(private dialog: MatDialog, public auth: AuthService) { }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.isAdmin = !!user && user.isAdmin
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
}

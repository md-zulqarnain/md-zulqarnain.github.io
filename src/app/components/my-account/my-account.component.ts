import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  userLogin: boolean = false;
  loginUserData: any;
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.loggedInUser()
    this.isLoggedIn()
  }
  logout() { 
    this.authService.SignOut();
    this.isLoggedIn()
  }
  signIn() { 
    this.authService.GoogleAuth()
  }

  isLoggedIn() { 
    this.userLogin = this.authService.isLoggedIn;
    console.log(this.authService.isLoggedIn, 'this.userLogin')
  }

  loggedInUser() { 
    this.loginUserData = this.userService.loggedInUser();
  }

}

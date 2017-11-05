import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { UserInfo } from '../../shared/user-info';
import { Observable, BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  userInfo: Observable<UserInfo>;
  isLoggedIn = new BehaviorSubject(false);
  constructor(private authService: AuthService, private router: Router) {
    console.log("Displaying Dashboard");
    this.userInfo = authService.userInfo;
    this.userInfo
      .map(userInfo => !userInfo.isAnonymous)
      .subscribe(this.isLoggedIn);
    this.checkLogin();
  }

  checkLogin(): boolean {
    //this.authService.addPT();
    if (this.authService.isLoggedInBool() === undefined || this.authService.isLoggedInBool() === null) {
      console.log("Skipping Info Page Display");
      return false;
    }
    console.log("Showing Info Page Display");
    console.log(this.authService.currentUserAsVar());
    console.log(this.authService.currentUser());
    return !this.authService.isLoggedInBool();
  }

  currentUser(): Observable<UserInfo> {
    return this.authService.currentUser();
  }


}

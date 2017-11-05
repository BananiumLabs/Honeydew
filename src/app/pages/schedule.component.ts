import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { UserInfo } from '../shared/user-info';
import { Observable, BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-schedule',
//   styleUrls: ['./schedule.component.scss'],
  templateUrl: './schedule.component.html',
})
export class ScheduleComponent implements AfterViewInit, OnDestroy {
  userInfo: Observable<UserInfo>;
  isLoggedIn = new BehaviorSubject(false);
  name: string;


  constructor(private authService: AuthService, private router: Router) {
    console.log("Displaying schedule");
    this.userInfo = authService.userInfo;
    this.userInfo
      .map(userInfo => !userInfo.isAnonymous)
      .subscribe(this.isLoggedIn);
    this.checkLogin();
    // this.name = this.authService.currentUserAsVar().displayName;
  }

  ngAfterViewInit() {
   
  }

  ngOnDestroy(): void {
  }
  
  checkLogin(): boolean {
    if (this.authService.isLoggedInBool() == false) {
      console.log("Skipping Display");
      this.router.navigate(['pages/welcome']);
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

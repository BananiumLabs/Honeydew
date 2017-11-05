import { OnInit, Component, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { UserInfo } from '../shared/user-info';
import { Observable, BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-timer',
//   styleUrls: ['./timer.component.scss'],
  templateUrl: './timer.component.html',
})

export class TimerComponent implements OnInit, OnDestroy {
  userInfo: Observable<UserInfo>;
  isLoggedIn = new BehaviorSubject(false);
  name: string;

  ticks = 0;
  formattedTime: string;

  date: Date;

  constructor(private authService: AuthService, private router: Router) {
    console.log("Displaying timer");
    this.date = new Date(null);
    this.userInfo = authService.userInfo;
    this.userInfo
      .map(userInfo => !userInfo.isAnonymous)
      .subscribe(this.isLoggedIn);
    this.checkLogin();
    // this.name = this.authService.currentUserAsVar().displayName;
  }

  ngOnInit() {
    let timer = Observable.timer(0, 1000);
    timer.subscribe(t => this.formattedTime = this.dhms(t));
    
    // this.date.setSeconds(this.ticks); // specify value for SECONDS here
    // this.formattedTime = this.date.toISOString().substr(11, 8);
    

  }

  ngOnDestroy(): void {
  }
  
  checkLogin(): boolean {
    //this.authService.addPT();
    if (this.authService.isLoggedInBool() === undefined || this.authService.isLoggedInBool() === null) {
      console.log("Skipping Info Page Display");
      // this.router.navigate(['../welcome/'])
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

  dhms(t) {
    var days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return [
      hours + 'h',
      minutes + 'm',
      seconds + 's'
    ].join(' ');
  }


}

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
  validTime: number;

  date: Date;

  timer: any;
  timerSubscription: any;
  disableTimer: number;

  demoFinished: boolean;

  constructor(private authService: AuthService, private router: Router) {
    console.log("Displaying timer");
    this.disableTimer = -1;
    this.demoFinished = false;
    this.date = new Date(null);
    this.userInfo = authService.userInfo;
    this.userInfo
      .map(userInfo => !userInfo.isAnonymous)
      .subscribe(this.isLoggedIn);
    this.checkLogin();
    // this.name = this.authService.currentUserAsVar().displayName;
  }

  ngOnInit() {
    this.timer = Observable.timer(0, 1000);
    this.timerSubscription = this.timer.subscribe(t => this.timeHandler(t));
    
    // this.date.setSeconds(this.ticks); // specify value for SECONDS here
    // this.formattedTime = this.date.toISOString().substr(11, 8);
  }

  timeHandler(t) {
    this.formattedTime = this.dhms(t);
    if(this.disableTimer == -1)
      this.validTime = t;
      console.log(this.validTime);
  }

  dismissTime() {
    this.ticks = 0;
    this.disableTimer = 2;
  }
  submitTime() {
    this.disableTimer = 1;
  }
  ngOnDestroy(): void {
    console.log("Disposing Subscription");
    this.demoFinished = true;
    try {
      this.timerSubscription.unsubscribe();
    }
    catch (Error) {
      console.log("Info: timerSubscription already unsubscibed");
    }
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

  dhms(t) {
    if (this.disableTimer == 1) {
      console.log("Disposing Subscription");
      this.demoFinished = true;
      this.timerSubscription.unsubscribe();
      return "Timer Completed!";
    }
    else if (this.disableTimer == 2) {
      console.log("Disposing Subscription");
      this.demoFinished = true;
      this.timerSubscription.unsubscribe();
      return "Timer Cancelled!";
    }
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

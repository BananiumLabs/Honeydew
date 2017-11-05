import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { UserInfo } from '../../shared/user-info';
import { ModalComponent } from '../ui-features/modals/modal/modal.component';
import { Observable, BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  userInfo: Observable<UserInfo>;
  isLoggedIn = new BehaviorSubject(false);
  name: string;


  constructor(private authService: AuthService, private router: Router, private modalService: NgbModal) {
    console.log("Displaying Dashboard");
    this.userInfo = authService.userInfo;
    this.userInfo
      .map(userInfo => !userInfo.isAnonymous)
      .subscribe(this.isLoggedIn);
    this.checkLogin();
    // this.name = this.authService.currentUserAsVar().displayName;
  }

  ngAfterViewInit() {
   
  }
  showStaticModal() {
    const activeModal = this.modalService.open(ModalComponent, {
      size: 'sm',
      backdrop: 'static',
      container: 'nb-layout',
    });

    activeModal.componentInstance.modalHeader = 'Add Assignment';
    activeModal.componentInstance.modalContent = `Would you like to add this assignment to your ongoing list? Click × to dismiss or confirmation button to submit.`;
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


}

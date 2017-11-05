import {Component} from "@angular/core";
// import {AuthService} from "app/shared/auth.service";
import { Observable, BehaviorSubject } from "rxjs";
import {Router} from "@angular/router";
import { AuthService } from "../shared/auth.service";

@Component({
    selector: 'welcome',
    templateUrl: 'welcome.component.html',
    styleUrls: ['welcome.scss']
})
export class WelcomeComponent {
    
    constructor(private router: Router, private auth : AuthService) {

    }

    next() {
        // console.log(this.router.navigate(['one']));
        if (this.auth.isLoggedInBool())
            window.location.href = '/#/pages/welcome/two';
        else
            window.location.href = '/#/auth/login';
    }
}

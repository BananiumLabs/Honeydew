import {Component} from "@angular/core";
import {AuthService} from "../shared/auth.service";
import { Observable, BehaviorSubject } from "rxjs";
import {Router} from "@angular/router";

@Component({
    selector: 'one',
    templateUrl: 'one.component.html',
    styleUrls: ['welcome.scss']
})
export class OneComponent {
    
    constructor(private router: Router) {
        
    }

    next() {
        // console.log(this.router.navigate(['one']));
        window.location.href = '/#/pages/welcome/two';
        console.log('click');
    }
}

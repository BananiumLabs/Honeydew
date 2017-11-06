import {Component} from "@angular/core";
import {AuthService} from "../shared/auth.service";
import { Observable, BehaviorSubject } from "rxjs";
import {Router} from "@angular/router";

@Component({
    selector: 'two',
    templateUrl: 'two.component.html',
    styleUrls: ['welcome.scss']
})
export class TwoComponent {
    
    constructor(private router: Router) {
        
    }
}

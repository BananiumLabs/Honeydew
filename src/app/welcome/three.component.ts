import {Component} from "@angular/core";
import {AuthService} from "../shared/auth.service";
import { Observable, BehaviorSubject } from "rxjs";
import {Router} from "@angular/router";

@Component({
    selector: 'three',
    templateUrl: 'three.component.html',
    styleUrls: ['welcome.scss']
})
export class ThreeComponent {
    
    constructor(private router: Router) {
        
    }
}

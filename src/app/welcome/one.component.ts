import {Component} from "@angular/core";
import {AuthService} from "../shared/auth.service";
import { Observable, BehaviorSubject } from "rxjs";
import {Router} from "@angular/router";
import { ThemeModule } from '../@theme/theme.module';

@Component({
    selector: 'one',
    templateUrl: 'one.component.html',
    styleUrls: ['welcome.scss']
})
export class OneComponent {
    
    num: number;
    nums;

    constructor(private router: Router) {
        
    }

    next() {
        // console.log(this.router.navigate(['one']));
        window.location.href = '/#/pages/welcome/two';
        console.log('click');
    }

    onKey(event: any) {
        this.num = event.target.value;
        this.nums = new Array(6).fill(1).map((x, i) => i);
        console.log(this.num);
    }

    getNums() {
        return this.nums;
    }
}

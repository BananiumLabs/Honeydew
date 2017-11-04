import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/auth.service";
import * as buttonModule from "tns-core-modules/ui/button";
import * as observable from "tns-core-modules/data/observable";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    
    constructor(auth: AuthService) {
        /* ***********************************************************
        * Use the constructor to inject services.
        *************************************************************/
        var button = new buttonModule.Button();

        button.on(buttonModule.Button.tapEvent, function (args: observable.EventData) {
            alert('yoo');
        });
        
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for the view.
        *************************************************************/
    }
}

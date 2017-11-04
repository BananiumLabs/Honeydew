import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/auth.service";
import { EventData } from "data/observable";
import { Button } from "ui/button";
import {MatButtonModule} from '@angular/material';
import { registerElement } from "nativescript-angular/element-registry";
registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    
    constructor() {
        /* ***********************************************************
        * Use the constructor to inject services.
        *************************************************************/
        
        
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for the view.
        *************************************************************/
    }

    onTap(args: EventData) {
        let button = <Button>args.object;
    
        alert('hi');
    }
}

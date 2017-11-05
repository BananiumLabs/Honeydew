import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WelcomeComponent } from './welcome.component';

@NgModule({
    declarations: [
        WelcomeComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        RouterModule.forChild([
            { path: '', component: WelcomeComponent},
            // { path: '1', component: OneComponent}, 
        ]),
    ],
    exports: [
        RouterModule
    ]
})
export class WelcomeModule {
} 
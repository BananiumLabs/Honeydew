import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WelcomeComponent } from './welcome.component';

import { OneComponent } from './one.component';
import { TwoComponent } from './two.component';
import { ThreeComponent } from './three.component';

@NgModule({
    declarations: [
        WelcomeComponent,
        OneComponent,
        TwoComponent,
        ThreeComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        RouterModule.forChild([
            { path: '', component: WelcomeComponent},
            { path: 'one', component: OneComponent},
            { path: 'two', component: TwoComponent},
            { path: 'three', component: ThreeComponent}, 
        ]),
    ],
    exports: [
        RouterModule
    ]
})
export class WelcomeModule {
} 
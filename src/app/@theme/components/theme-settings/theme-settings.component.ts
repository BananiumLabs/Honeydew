import { Component, Input, OnInit } from '@angular/core';

import { StateService } from '../../../@core/data/state.service';

import { AuthService } from '../../../shared/auth.service';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'ngx-theme-settings',
  styleUrls: ['./theme-settings.component.scss'],
  template: `
    <!--<h6>LAYOUTS</h6>
    <div class="settings-row">
      <a *ngFor="let layout of layouts"
         href="#"
         [class.selected]="layout.selected"
         [attr.title]="layout.name"
         (click)="layoutSelect(layout)">
        <i [attr.class]="layout.icon"></i>
      </a>
    </div>
    <h6>SIDEBAR</h6>
    <div class="settings-row">
      <a *ngFor="let sidebar of sidebars"
         href="#"
         [class.selected]="sidebar.selected"
         [attr.title]="sidebar.name"
         (click)="sidebarSelect(sidebar)">
        <i [attr.class]="sidebar.icon"></i>
      </a>
    </div>-->

    <h6>Log In</h6>
    <div class="settings-row">
      <button type="button" class="btn btn-success btn-icon" (click)="login()">
              <i class="fa fa fa-sign-in"></i>
      </button>
    </div>

    <h6>Log Off</h6>
    <div class="settings-row">
      <button type="button" class="btn btn-danger btn-icon" (click)="logout()">
              <i class="fa fa fa-sign-out"></i>
      </button>
    </div>
  `,
})
export class ThemeSettingsComponent {

  layouts = [];
  sidebars = [];

  constructor(protected stateService: StateService, private authService: AuthService, private router: Router) {
    this.stateService.getLayoutStates()
      .subscribe((layouts: any[]) => this.layouts = layouts);

    this.stateService.getSidebarStates()
      .subscribe((sidebars: any[]) => this.sidebars = sidebars);
  }

  login() {
    this.router.navigate(['/auth/login']);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  layoutSelect(layout: any): boolean {
    this.layouts = this.layouts.map((l: any) => {
      l.selected = false;
      return l;
    });

    layout.selected = true;
    this.stateService.setLayoutState(layout);
    return false;
  }

  sidebarSelect(sidebars: any): boolean {
    this.sidebars = this.sidebars.map((s: any) => {
      s.selected = false;
      return s;
    });

    sidebars.selected = true;
    this.stateService.setSidebarState(sidebars);
    return false;
  }
}

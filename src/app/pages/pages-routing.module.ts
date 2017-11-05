import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimerComponent } from './timer.component';
import { ReportsComponent } from './reports.component';
import { ScheduleComponent } from './schedule.component';

import { ThemeModule } from '../@theme/theme.module';
import { EchartsRadarComponent } from './charts/echarts/echarts-radar.component';
import { EchartsPieComponent } from './charts/echarts/echarts-pie.component';
import { AngularEchartsModule } from 'ngx-echarts';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
    path: 'dashboard',
    component: DashboardComponent, 
   }, 
  {
    path: 'schedule', 
    component: ScheduleComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
  {
    path: 'timer',
    component: TimerComponent,
  },
  {
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  }, {
    path: 'components',
    loadChildren: './components/components.module#ComponentsModule',
  }, {
    path: 'maps',
    loadChildren: './maps/maps.module#MapsModule',
  }, {
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',
  }, {
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  }, {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  }, {
    path: 'welcome',
    loadChildren: '../welcome/welcome.module#WelcomeModule'
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes),
    ThemeModule,
  AngularEchartsModule],
  exports: [RouterModule],
  declarations: [
    TimerComponent,
    ScheduleComponent,
    ReportsComponent,
    EchartsRadarComponent,
    EchartsPieComponent
  ]
})
export class PagesRoutingModule {
}

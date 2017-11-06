import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-radar',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsRadarComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.success, colors.warning],
        tooltip: {},
        legend: {
          data: ['Goal Today', 'Estimated Time'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        radar: {
          name: {
            textStyle: {
              color: echarts.textColor,
            },
          },
          indicator: [
            { name: 'Calculus', max: 65 },
            { name: 'History', max: 16 },
            { name: 'Spanish', max: 30 },
            { name: 'Literature', max: 38 },
            { name: 'Physics', max: 52 },
            { name: 'Music', max: 25 },
          ],
          splitArea: {
            areaStyle: {
              color: 'transparent',
            },
          },
        },
        series: [
          {
            name: 'Budget vs Spending',
            type: 'radar',
            data: [
              {
                value: [43, 10, 28, 35, 50, 19],
                name: 'Goal Today',
              },
              {
                value: [50, 14, 28, 31, 42, 21],
                name: 'Estimated Time',
              },
            ],
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    try {
      this.themeSubscription.unsubscribe();
    }
    catch (Error) {
      console.warn("WARN: echarts-radar FAILED to unsubscribe");
    }
  }
}

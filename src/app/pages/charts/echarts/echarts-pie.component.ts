import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight, colors.success],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Calculus', 'History', 'Spanish', 'Literature', 'Physics', 'Music'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Classes',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { name: 'Calculus', value: 65 },
              { name: 'History', value: 16 },
              { name: 'Spanish', value: 30 },
              { name: 'Literature', value: 38 },
              { name: 'Physics', value: 52 },
              { name: 'Music', value: 25 },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
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
      console.warn("WARN: echarts-pie FAILED to unsubscribe");
    }
  }
}

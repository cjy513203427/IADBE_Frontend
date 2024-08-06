import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-echarts-bar',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsBarComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: Subscription | undefined;
  dataSubscription: Subscription | undefined;

  constructor(private theme: NbThemeService, private http: HttpClient) {}

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.dataSubscription = this.http.get<any[]>('http://localhost:8080/api/bar-data').subscribe(data => {
        // Process data to fit the chart requirements
        const modelNames = data.map(item => item.modelName);
        const fileSizes = data.map(item => parseInt(item.fileSize, 10));

        this.options = {
          backgroundColor: echarts.bg,
          color: [colors.primaryLight],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
            formatter: function (params: any) {
              let result = '';
              params.forEach((item: any) => {
                result += `${item.axisValue}<br/>${item.seriesName}: ${item.value} MB<br/>`;
              });
              return result;
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '15%', // Increase bottom margin to prevent overlap
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              data: modelNames,
              axisTick: {
                alignWithLabel: true,
              },
              axisLine: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor,
                },
                rotate: 45, // Rotate labels to prevent overlap
                interval: 0, // Show all labels
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
              splitLine: {
                lineStyle: {
                  color: echarts.splitLineColor,
                },
              },
              axisLabel: {
                formatter: '{value} MB',
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
          ],
          series: [
            {
              name: 'File Size',
              type: 'bar',
              barWidth: '60%',
              data: fileSizes,
            },
          ],
        };
      });
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
    this.dataSubscription?.unsubscribe();
  }
}

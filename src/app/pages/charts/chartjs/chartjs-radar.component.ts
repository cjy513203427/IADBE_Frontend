import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-chartjs-radar',
  template: `
    <chart type="radar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsRadarComponent implements OnInit, OnDestroy {
  options: any;
  data: any = {}; // initialize data
  themeSubscription: any;

  constructor(private theme: NbThemeService, private http: HttpClient) {}

  ngOnInit(): void {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      // request data from backend
      this.http.get<any[]>('http://localhost:8080/api/radar-data')
        .subscribe(response => {
          this.data = {
            labels: ['Training Time', 'Model Size', 'F1Score'],
            datasets: response.map((item, index) => ({
              data: item.data,
              label: item.label,
              borderColor: this.getBorderColor(colors, index),
              backgroundColor: NbColorHelper.hexToRgbA(this.getBackgroundColor(colors, index), 0.5),
            })),
          };
        });

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        scaleFontColor: 'white',
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        scale: {
          pointLabels: {
            fontSize: 14,
            fontColor: chartjs.textColor,
          },
          gridLines: {
            color: chartjs.axisLineColor,
          },
          angleLines: {
            color: chartjs.axisLineColor,
          },
        },
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  // Helper functions to get colors dynamically
  private getBorderColor(colors, index): string {
    const borderColors = [colors.danger, colors.warning];
    return borderColors[index % borderColors.length];
  }

  private getBackgroundColor(colors, index): string {
    const backgroundColors = [colors.dangerLight, colors.warningLight];
    return backgroundColors[index % backgroundColors.length];
  }
}

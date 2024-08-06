import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-chartjs-line',
  template: `
    <chart type="line" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsLineComponent implements OnDestroy, AfterViewInit {
  data: any;
  options: any;
  themeSubscription: any;
  dataSubscription: any;

  constructor(private theme: NbThemeService, private http: HttpClient) {}

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.dataSubscription = this.http.get<{ labels: string[], datasets: { label: string, data: number[] }[] }>('http://localhost:8080/api/line-data')
        .subscribe(apiData => {

          const colorPalette = ['#FF5733', '#33FF57', '#3357FF', '#ea70b2', '#33FFCE'];

          this.data = {
            labels: apiData.labels,
            datasets: apiData.datasets.map((dataset, index) => ({
              label: dataset.label,
              data: dataset.data,
              backgroundColor: NbColorHelper.hexToRgbA(colorPalette[index % colorPalette.length], 0.3),
              borderColor: colorPalette[index % colorPalette.length],
            })),
          };

          this.options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              xAxes: [{
                type: 'category',
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              }],
              yAxes: [{
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              }],
            },
            legend: {
              labels: {
                fontColor: chartjs.textColor,
              },
            },
          };
        }, error => {
          console.error('API Request Error:', error);
        });
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}

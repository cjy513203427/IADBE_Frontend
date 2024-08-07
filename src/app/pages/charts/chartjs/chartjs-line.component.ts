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

          // Tooltip callback function to format time as xxhxxmxxs
          const formatTime = (seconds: number): string => {
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            const s = seconds % 60;
            return `${h}h${m}m${s}s`;
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
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  const value = tooltipItem.yLabel || 0; // Get the y-axis value from the tooltip
                  return formatTime(value); // Convert the value to xxhxxmxxs format
                },
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

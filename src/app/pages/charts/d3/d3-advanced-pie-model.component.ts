import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AdvancePieData {
  name: string;
  value: number;
}

@Component({
  selector: 'ngx-d3-advanced-pie-model',
  template: `
    <ngx-charts-advanced-pie-chart
      [scheme]="colorScheme"
      [results]="single">
    </ngx-charts-advanced-pie-chart>
  `,
})
export class D3AdvancedPieModelComponent implements OnInit, OnDestroy {
  single: AdvancePieData[] = [];
  colorScheme: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService, private http: HttpClient) {}

  ngOnInit(): void {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });

    this.getPieData().subscribe(data => {
      this.single = data;
    });
  }

  getPieData(): Observable<AdvancePieData[]> {
    return this.http.get<AdvancePieData[]>('http://localhost:8080/api/advance-pie-model');
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AdvancePie {
  name: string;
  value: number;
}

@Component({
  selector: 'ngx-d3-advanced-pie-dataset',
  template: `
    <ngx-charts-advanced-pie-chart
      [scheme]="colorScheme"
      [results]="single">
    </ngx-charts-advanced-pie-chart>
  `,
})
export class D3AdvancedPieDatasetComponent implements OnInit, OnDestroy {
  single: AdvancePie[] = [];
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

  getPieData(): Observable<AdvancePie[]> {
    return this.http.get<AdvancePie[]>('http://localhost:8080/api/advance-pie-dataset');
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}

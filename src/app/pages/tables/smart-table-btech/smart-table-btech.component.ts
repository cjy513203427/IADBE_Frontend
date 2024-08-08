import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-smart-table-btech-btech',
  templateUrl: './smart-table-btech.component.html',
  styleUrls: ['./smart-table-btech.component.scss'],
})
export class SmartTableBtechComponent implements OnInit {

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      model: {
        title: 'Model',
        type: 'string',
      },
      '01': {
        title: '01',
        type: 'number',
      },
      '02': {
        title: '02',
        type: 'number',
      },
      '03': {
        title: '03',
        type: 'number',
      },
      average: {
        title: 'Average',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getBtechData().subscribe(data => {
      this.source.load(data);
    });
  }

  // Service logic included within the component
  getBtechData(): Observable<any[]> {
    const apiUrl = 'http://localhost:8080/api/btech-benchmark'; // Replace with your backend API URL
    return this.http.get<any[]>(apiUrl);
  }
}

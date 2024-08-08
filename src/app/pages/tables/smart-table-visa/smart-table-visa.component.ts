import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-smart-table-visa',
  templateUrl: './smart-table-visa.component.html',
  styleUrls: ['./smart-table-visa.component.scss'],
})
export class SmartTableVisaComponent implements OnInit {

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
      candle: {
        title: 'Candle',
        type: 'number',
      },
      capsules: {
        title: 'Capsules',
        type: 'number',
      },
      cashew: {
        title: 'Cashew',
        type: 'number',
      },
      chewinggum: {
        title: 'Chewinggum',
        type: 'number',
      },
      fryum: {
        title: 'Fryum',
        type: 'number',
      },
      macaroni1: {
        title: 'Macaroni1',
        type: 'number',
      },
      macaroni2: {
        title: 'Macaroni2',
        type: 'number',
      },
      pcb1: {
        title: 'PCB1',
        type: 'number',
      },
      pcb2: {
        title: 'PCB2',
        type: 'number',
      },
      pcb3: {
        title: 'PCB3',
        type: 'number',
      },
      pcb4: {
        title: 'PCB4',
        type: 'number',
      },
      pipeFryum: {
        title: 'Pipe Fryum',
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
    this.getVisABMData().subscribe(data => {
      this.source.load(data);
    });
  }

  // Service logic included within the component
  getVisABMData(): Observable<VisABM[]> {
    const apiUrl = 'http://localhost:8080/api/visa-benchmark'; // Replace with your backend API URL
    return this.http.get<VisABM[]>(apiUrl);
  }
}

// Define the type of the data if it's not already available
export interface VisABM {
  model: string;
  candle: number;
  capsules: number;
  cashew: number;
  chewinggum: number;
  fryum: number;
  macaroni1: number;
  macaroni2: number;
  pcb1: number;
  pcb2: number;
  pcb3: number;
  pcb4: number;
  pipeFryum: number;
  average: number;
}

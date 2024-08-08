import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-smart-table-mvtec3d',
  templateUrl: './smart-table-mvtec3d.component.html',
  styleUrls: ['./smart-table-mvtec3d.component.scss'],
})
export class SmartTableMVTec3dComponent implements OnInit {

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
      bagel: {
        title: 'Bagel',
        type: 'number',
      },
      cableGland: {
        title: 'Cable Gland',
        type: 'number',
      },
      carrot: {
        title: 'Carrot',
        type: 'number',
      },
      cookie: {
        title: 'Cookie',
        type: 'number',
      },
      dowel: {
        title: 'Dowel',
        type: 'number',
      },
      foam: {
        title: 'Foam',
        type: 'number',
      },
      peach: {
        title: 'Peach',
        type: 'number',
      },
      potato: {
        title: 'Potato',
        type: 'number',
      },
      rope: {
        title: 'Rope',
        type: 'number',
      },
      tire: {
        title: 'Tire',
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
    this.getMVTec3DData().subscribe(data => {
      this.source.load(data);
    });
  }

  // Service logic included within the component
  getMVTec3DData(): Observable<MVTec3DBM[]> {
    const apiUrl = 'http://localhost:8080/api/mvtec3d-benchmark'; // Replace with your backend API URL
    return this.http.get<MVTec3DBM[]>(apiUrl);
  }
}

// Define the type of the data if it's not already available
export interface MVTec3DBM {
  model: string;
  bagel: number;
  cableGland: number;
  carrot: number;
  cookie: number;
  dowel: number;
  foam: number;
  peach: number;
  potato: number;
  rope: number;
  tire: number;
  average: number;
}

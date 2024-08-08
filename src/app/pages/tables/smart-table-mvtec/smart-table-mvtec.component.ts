import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-smart-table-mvtec',
  templateUrl: './smart-table-mvtec.component.html',
  styleUrls: ['./smart-table-mvtec.component.scss'],
})
export class SmartTableMVTecComponent implements OnInit {

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
      screw: {
        title: 'Screw',
        type: 'number',
      },
      pill: {
        title: 'Pill',
        type: 'number',
      },
      capsule: {
        title: 'Capsule',
        type: 'number',
      },
      carpet: {
        title: 'Carpet',
        type: 'number',
      },
      grid: {
        title: 'Grid',
        type: 'number',
      },
      tile: {
        title: 'Tile',
        type: 'number',
      },
      wood: {
        title: 'Wood',
        type: 'number',
      },
      zipper: {
        title: 'Zipper',
        type: 'number',
      },
      cable: {
        title: 'Cable',
        type: 'number',
      },
      toothbrush: {
        title: 'Toothbrush',
        type: 'number',
      },
      transistor: {
        title: 'Transistor',
        type: 'number',
      },
      metalNut: {
        title: 'Metal Nut',
        type: 'number',
      },
      bottle: {
        title: 'Bottle',
        type: 'number',
      },
      hazelnut: {
        title: 'Hazelnut',
        type: 'number',
      },
      leather: {
        title: 'Leather',
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
    const apiUrl = 'http://localhost:8080/api/mvtec-benchmark'; // Replace with your backend API URL
    return this.http.get<MVTec3DBM[]>(apiUrl);
  }
}

// Define the type of the data if it's not already available
export interface MVTec3DBM {
  model: string;
  screw: number;
  pill: number;
  capsule: number;
  carpet: number;
  grid: number;
  tile: number;
  wood: number;
  zipper: number;
  cable: number;
  toothbrush: number;
  transistor: number;
  metalNut: number;
  bottle: number;
  hazelnut: number;
  leather: number;
  average: number;
}

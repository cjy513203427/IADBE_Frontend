import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableBtechComponent } from './smart-table-btech/smart-table-btech.component';
import { SmartTableMVTec3dComponent } from './smart-table-mvtec3d/smart-table-mvtec3d.component';
import { SmartTableMVTecComponent } from './smart-table-mvtec/smart-table-mvtec.component';
import { SmartTableVisaComponent } from './smart-table-visa/smart-table-visa.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'smart-table-btech',
      component: SmartTableBtechComponent,
    },
    {
      path: 'smart-table-mvtec3d',
      component: SmartTableMVTec3dComponent,
    },
    {
      path: 'smart-table-mvtec',
      component: SmartTableMVTecComponent,
    },
    {
      path: 'smart-table-visa',
      component: SmartTableVisaComponent,
    },
    {
      path: 'tree-grid',
      component: TreeGridComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  SmartTableBtechComponent,
  SmartTableMVTec3dComponent,
  SmartTableMVTecComponent,
  SmartTableVisaComponent,
  TreeGridComponent,
];

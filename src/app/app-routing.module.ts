import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SampleTableComponent} from "./sample-table/sample-table.component";

const routes: Routes = [
  {
    path: 'home',
    component: SampleTableComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

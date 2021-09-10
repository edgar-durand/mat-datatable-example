import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";

const modules = [
  CommonModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatSortModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule
]

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class AngularMaterialModule { }

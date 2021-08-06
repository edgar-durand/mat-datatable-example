import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SampleTableDataSource } from './sample-table-datasource';
import {SampleTableItem} from "../interface/simple-table-Item";
import {DatatableService} from "../services/datatable.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-sample-table',
  templateUrl: './sample-table.component.html',
  styleUrls: ['./sample-table.component.scss']
})
export class SampleTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<SampleTableItem>;
  dataSource: SampleTableDataSource;
  private destroyed$: Subject<boolean> = new Subject<boolean>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description'];

  constructor(public datatableService: DatatableService) {
    this.datatableService.columns$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((res) => {
      this.displayedColumns = res.filter((ent) => typeof ent !== "undefined");
      console.log('table columns>>>', this.displayedColumns);
    });

    this.dataSource = new SampleTableDataSource(datatableService);
    // datatableService.getDataFromServer();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}

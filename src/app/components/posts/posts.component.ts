import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {PostsService} from "../../services/posts.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {IPost} from "../../interface/IPost";
import {applyFilter} from "../../shared/utils";

@Component({
  selector: 'app-sample-table',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IPost>;

  datasource = new MatTableDataSource<IPost>();
  private destroyed$: Subject<boolean> = new Subject<boolean>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = [];

  constructor(
    public datatableService: PostsService
  ) {
    this.datatableService.columns$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((res) => {
      this.displayedColumns = res.filter((ent) => typeof ent !== "undefined");
    });
    this.datatableService.data$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data) => {
      this.datasource.data = data;
    })
  }

  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
    this.table.dataSource = this.datasource;
  }

  applyFilter(filterValue: string) {
    applyFilter(filterValue, this.datasource);
  }

  ngOnInit(): void {
    this.datasource.filterPredicate =
      (data: IPost, filter: string) => {
        const valorBuscado = filter.toLowerCase();
        // id
        if (data.id && data.id.toString().includes(valorBuscado)) {
          return true;
        }
        // userId
        if (data.userId && data.userId.toString().toLowerCase().includes(valorBuscado)) {
          return true;
        }
        // title
        if (data.title && data.title.toLowerCase().includes(valorBuscado)) {
          return true;
        }
        // body
        return !!(data.body && data.body.toLowerCase().includes(valorBuscado));
      };
  }
}

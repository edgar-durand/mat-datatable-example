import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommentsService} from "../../services/comments.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {IComments} from "../../interface/IComments";
import {applyFilter} from "../../shared/utils";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IComments>;

  datasource = new MatTableDataSource<IComments>();
  private destroyed$: Subject<boolean> = new Subject<boolean>();

  displayedColumns: string[] = [];

  constructor(
    public commentsService: CommentsService,
    private route: ActivatedRoute,
  ) {
    this.commentsService.columns$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((res) => {
      this.displayedColumns = res.filter((ent) => typeof ent !== "undefined");
    });
    this.commentsService.comments$.pipe(
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
    const id = this.route.snapshot.params.id;
    this.commentsService.getComments(id);

    this.datasource.filterPredicate =
      (data: IComments, filter: string) => {
        const valorBuscado = filter.toLowerCase();
        // id
        if (data.id && data.id.toString().includes(valorBuscado)) {
          return true;
        }
        // name
        if (data.name && data.name.toLowerCase().includes(valorBuscado)) {
          return true;
        }
        // email
        if (data.email && data.email.toLowerCase().includes(valorBuscado)) {
          return true;
        }
        // body
        return !!(data.body && data.body.toLowerCase().includes(valorBuscado));
      };
  }
}

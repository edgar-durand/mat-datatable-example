import {Component, OnDestroy, OnInit} from '@angular/core';
import {XlsxService} from "../services/xlsx.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DatatableService} from "../services/datatable.service";
import {setDefault} from "../shared/utils";

@Component({
  selector: 'app-load-xlsx',
  templateUrl: './load-xlsx.component.html',
  styleUrls: ['./load-xlsx.component.scss']
})
export class LoadXlsxComponent implements OnInit, OnDestroy {
  private destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private xlsxService: XlsxService, private datatableService: DatatableService) {

    this.xlsxService.state$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(async(state) => {
      console.log(state);
      const data = state.dataset;
      const columns = data?.shift();

      console.log(state);
      if (state.fileLoaded) {
        console.log('columns>>', columns);
        console.log('rows>>', data);
        this.datatableService.data$.next(await this.datatableService.loadAsJson(columns, <any[]>data));
        this.datatableService.columns$.next(columns);
      }
    })
  }

  handleLoad(event: Event): void {
    this.xlsxService.handleLoad(event);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyed$.next(false);
    this.destroyed$.unsubscribe();
  }
}

import { Injectable } from '@angular/core';
import * as XLSX  from 'xlsx';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class XlsxService {
  state$: BehaviorSubject<{
    dataset?: any[];
    fileLoaded?: boolean;
    fileName?: string;
    operationInProgress?: boolean;
  }> = new BehaviorSubject<{dataset?: any[], fileLoaded?: boolean, fileName?: string, operationInProgress?: boolean}>({})

  constructor() { }

  async handleLoad(target: any): Promise<void> {
    let reader = new FileReader();
    let file = target.target.files[0];

    this.state$.next({
      ...this.state$.value,
      fileName: file.name,
      operationInProgress: true
    });

    try {
      reader.onload = async (e) => {
        let data = new Uint8Array(<ArrayBufferLike>e.target?.result);
        let workbook = XLSX.read(data, { type: "array" });
        let worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let sheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        this.state$.next({
          dataset: sheet,
          fileLoaded: true,
          fileName: file.name,
          operationInProgress: false
        });
      };
      reader.readAsArrayBuffer(file);
    } catch (e) {
      console.log('error..', e);
    }
  }
}

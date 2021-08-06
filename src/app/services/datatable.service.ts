import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {SampleTableItem} from "../interface/simple-table-Item";
import {HttpService} from "./http.service";
import { environment } from '../../environments/environment';
import {setDefault} from "../shared/utils";

@Injectable({
  providedIn: 'root'
})
export class DatatableService {
  data$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  columns$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(private httpService: HttpService) { }

  async getDataFromServer(): Promise<void> {
    //TODO: Replace with your API endpoint
    const url = `${environment.apiUrl}api/category`;

    //TODO: Do request to API then data$.next(response)
    const response = await (await this.httpService.get(url)).json();
    this.data$.next(response.response.data);
  }

  async loadAsJson(columns: string[], rows: string[]): Promise<any[]> {
    const data: any[] = [];
    rows.forEach((row) => {
      let json: any = {};
      columns.forEach((columnName, index) => {
        json[columnName] = setDefault(row[index]);
      });
      data.push(json);
    });

    console.log('jsonData>>>', data);
    return data;
  }
}

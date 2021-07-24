import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {SampleTableItem} from "../interface/simple-table-Item";
import {HttpService} from "./http.service";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {
  data$: BehaviorSubject<SampleTableItem[]> = new BehaviorSubject<SampleTableItem[]>([]);
  constructor(private httpService: HttpService) { }

  async getDataFromServer(): Promise<void> {
    //TODO: Replace with your API endpoint
    const url = `${environment.apiUrl}api/category`;

    //TODO: Do request to API then data$.next(response)
    const response = await (await this.httpService.get(url)).json();
    this.data$.next(response.response.data);
  }
}

import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpService} from "./http.service";
import {environment} from '../../environments/environment';
import {IPost} from "../interface/IPost";
import {getColumns} from "../shared/utils";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  data$: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  columns$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private httpService: HttpService) {
    this.getDataFromServer().then((res) => {
      const columns = getColumns(res[0]);
      columns.push('actions');
      this.columns$.next(columns)
    });

  }

  async getDataFromServer(): Promise<IPost[]> {
    const url = `${environment.apiUrl}posts`;
    const response = await (await this.httpService.get(url)).json();
    this.data$.next(response);
    return response;
  }
}

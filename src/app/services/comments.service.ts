import {Injectable} from '@angular/core';
import {IComments} from "../interface/IComments";
import {environment} from "../../environments/environment";
import {HttpService} from "./http.service";
import {BehaviorSubject} from "rxjs";
import {getColumns} from "../shared/utils";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  comments$: BehaviorSubject<IComments[]> = new BehaviorSubject<IComments[]>([]);
  columns$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  constructor(private httpService: HttpService) { }

  async getComments(id: string): Promise<void>{
    const url = `${environment.apiUrl}comments?postId=${id}`;
    const response = await (await this.httpService.get(url)).json();
    // @ts-ignore
    response.forEach((comment: IComments) => delete comment.postId)
    this.comments$.next(response);
    this.columns$.next(getColumns(response[0]))
  }
}

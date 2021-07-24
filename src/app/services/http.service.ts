import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  async get(url: string, requestInit?: RequestInit): Promise<any> {
    requestInit = {
      method: 'get',
      headers: {
        ContentType: 'application/json',
      },
      ...requestInit,
    };

    return await fetch(url, requestInit);
  }
}

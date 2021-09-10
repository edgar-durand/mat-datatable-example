import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  async get(url: string, requestInit?: RequestInit): Promise<any> {
    requestInit = {
      method: 'GET',
      headers: {
        ContentType: 'application/json',
      },
      ...requestInit,
    };

    try {
      return await fetch(url, requestInit);
    }catch (e) {
      return []
    }

  }
}

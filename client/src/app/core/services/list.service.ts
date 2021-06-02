import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  listEndpoint = API_ENDPOINTS.LIST;

  constructor(private _apiService: ApiService){}

  getList(query='', pageSize = 10, pageIndex = 1) {
    const url = `${this.listEndpoint.GET_LIST}?query=${query}&pageSize=${pageSize}&pageIndex=${pageIndex}`;
    return this._apiService.get(url);
  }

  addSelection(params: any) {
    const url = `${this.listEndpoint.SELECTION}`;
    return this._apiService.post(url, params);
  }

  getSelection() {
    const url = `${this.listEndpoint.SELECTION}`;
    return this._apiService.get(url);
  }
}

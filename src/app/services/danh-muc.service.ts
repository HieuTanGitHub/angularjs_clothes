import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DanhMuc } from '../models/danhmuc';

@Injectable({
  providedIn: 'root'
})
export class DanhMucService {
  url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<DanhMuc[]> {
    return this.httpClient.get<DanhMuc[]>(`${this.url}/danh_muc`);
  }

  get(id: string): Observable<DanhMuc> {
    return this.httpClient.get<DanhMuc>(`${this.url}/danh_muc/${id}`);
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.url}/danh_muc/${id}`);
  }

  save(danhMuc: DanhMuc): Observable<DanhMuc> {
    return this.httpClient.post<DanhMuc>(`${this.url}/danh_muc`, danhMuc);
  }

  update(id: string, danhMuc: DanhMuc): Observable<DanhMuc> {
    return this.httpClient.put<DanhMuc>(`${this.url}/danh_muc/${id}`, danhMuc);
  }
}

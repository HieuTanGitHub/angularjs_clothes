import { Category } from './../models/category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.url}/nha_sx`);
  }

  get(id: String): Observable<Category> {
    return this.httpClient.get<Category>(`${this.url}/nha_sx/${id}`);
  }

  delete(id: String): Observable<any> {
    return this.httpClient.delete(`${this.url}/nha_sx/${id}`);
  }

  save(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(`${this.url}/nha_sx`, category);
  }

  update(id: String, category: Category): Observable<Category> {
    return this.httpClient.put<Category>(`${this.url}/nha_sx/${id}`, category);
  }

  checkDuplicateName(name: string): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.url}/nha_sx?ten=${name}`);
  }
  getManufacturerById(id: string): Observable<Category> {
    return this.httpClient.get<Category>(`${this.url}/nha_sx/${id}`); // Lấy nhà sản xuất theo ID
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopDataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAlbums(): Observable<any> {
    return this.http.get(`${this.apiUrl}/album-images`);
  }

  getNews(): Observable<any> {
    return this.http.get(`${this.apiUrl}/news`);
  }

  addAlbum(album: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/album-images`, album);
  }

  updateAlbum(id: string, album: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/album-images/${id}`, album);
  }

  deleteAlbum(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/album-images/${id}`);
  }

  addNews(news: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/news`, news);
  }

  updateNews(id: string, news: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/news/${id}`, news);
  }

  deleteNews(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/news/${id}`);
  }
}

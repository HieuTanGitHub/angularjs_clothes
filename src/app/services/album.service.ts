import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlbumImage } from '../models/albumimages'; // Make sure you create this interface

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = 'http://localhost:3000/album-images'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getAlbumImages(): Observable<AlbumImage[]> {
    return this.http.get<AlbumImage[]>(this.apiUrl);
  }
}

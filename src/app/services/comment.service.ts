import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  url = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getCommentsByProductId(productId: string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.url}/comment?productId=${productId}`);
  }
}

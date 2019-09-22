import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENDPOIND } from '../constantes/constantes';
import { Observable } from 'rxjs';
import { Post } from '../modelos/post';
import { map } from 'rxjs/internal/operators/map';
import { Comentario } from '../modelos/comentario';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get(`${ENDPOIND}/posts`).pipe(map(this.castToPost));
  }

  getPost(id: number): Observable<Post> {
    return this.httpClient.get(`${ENDPOIND}/posts/${id}`).pipe(map(this.castOnePost));
  }

  getAllComents(): Observable<Comentario[]> {
    return this.httpClient.get(`${ENDPOIND}/comments`).pipe(map(this.castToComment));
  }

  getComentsByPost(id: number): Observable<Comentario[]> {
    return this.httpClient.get(`${ENDPOIND}/comments?postId=${id}`).pipe(map(this.castToComment));
  }

  deletePost(id: number): Observable<Post> {
    return this.httpClient.delete(`${ENDPOIND}/posts/${id}`).pipe(map(this.castOnePost));
  }

  addPost(post: Post): Observable<Post> {
    return this.httpClient.post(`${ENDPOIND}/posts`, post).pipe(map(this.castOnePost));
  }

  castOnePost(post: any): Post {
    return post as Post;
  }

  castToPost(list: any[]): Post[] {
    return list as Post[];
  }

  castToComment(list: any[]): Comentario[] {
    return list as Comentario[];
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENDPOIND } from '../constantes/constantes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<any> { // hacer algo aquí para que devuelva coleccion de Urusiaros
    return this.httpClient.get(`${ENDPOIND}/posts`);
  }

  getPost(id: number): Observable<any> {
    return this.httpClient.get(`${ENDPOIND}/posts/${id}`);
  }

  getAllComents(): Observable<any> {
    return this.httpClient.get(`${ENDPOIND}/comments`);
  }

  getComentsByPost(id: number): Observable<any> {
    return this.httpClient.get(`${ENDPOIND}/comments?postId=${id}`);
  }
}

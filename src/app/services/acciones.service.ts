import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Post } from '../modelos/post';

@Injectable({
  providedIn: 'root'
})
export class AccionesService {
  private idDeleted: Subject<number> = new BehaviorSubject<number>(-1);
  private post: Subject<Post> = new BehaviorSubject<Post>(null);

  get idDeleted$() {
    return this.idDeleted.asObservable();
  }

  addIdEliminar(id: number) {
    this.idDeleted.next(id);
  }

  get post$() {
    return this.post.asObservable();
  }

  addPostAgregar(post: Post) {
    this.post.next(post);
  }

  constructor() { }
}

import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Post } from 'src/app/modelos/post';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { AccionesService } from 'src/app/services/acciones.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  nuevoPost: Post;
  p: number = 1;
  idPostEliminar: number;
  constructor(private http: HttpService, private router: Router, private toast: ToastService, private acciones: AccionesService) { }

  ngOnInit() {
    this.getPost().then(res => {
      if (res) {
        this.acciones.idDeleted$.subscribe((id) => {
          if (id !== -1) {
            this.deletePostFromArray(id);
          }
        });
        this.acciones.post$.subscribe(post => {
          if (post) {
            this.posts.push(post);
          }
        });
      }
    });
  }

  getPost(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.getPosts().subscribe(res => {
        this.posts = res;
        if (this.idPostEliminar) {
          this.deletePostFromArray(this.idPostEliminar);
        }
        if (this.nuevoPost) {
          this.posts.push(this.nuevoPost);
        }
        resolve(true);
      }, error => {
        console.log(error);
        reject(false);
      });
    });
  }

  showPost(id: number) {
    this.router.navigate(['dashboard', 'post', id, -1]);
  }

  deletePostFromArray(id: number) {
    this.posts.splice(this.posts.findIndex((item: Post) => {
      return item.id == id;
    }), 1);
  }

}

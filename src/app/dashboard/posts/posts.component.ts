import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Post } from 'src/app/modelos/post';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  idPostEliminar: number;
  constructor(private http: HttpService, private router: Router, private toast: ToastService, private arouter: ActivatedRoute) { }

  ngOnInit() {
    this.getPost();
    this.arouter.params.subscribe(params => {
      if (params.idEliminar) {
        this.deletePostFromArray(params.idEliminar);
      }
    });
  }

  getPost() {
    this.http.getPosts().subscribe(res => {
      this.posts = res;
    });
  }

  showPost(id: number) {
    this.router.navigate(['dashboard', 'post', id]);
  }

  deletePostFromArray(id) {
    
  }

}

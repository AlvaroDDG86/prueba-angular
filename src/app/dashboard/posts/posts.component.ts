import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Post } from 'src/app/modelos/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  constructor(private http: HttpService, private router: Router) { }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this.http.getPosts().subscribe(res => {
      this.posts = res;
    });
  }

  addPost() {

  }

  deletePost() {

  }

  showPost(id: number) {
    this.router.navigate(['dashboard', 'post', id]);
  }

}

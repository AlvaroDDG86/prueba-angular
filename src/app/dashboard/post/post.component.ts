import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Post } from 'src/app/modelos/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  id: number;
  post: Post;
  constructor(private http: HttpService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      console.log(params);
      console.log(params.id);
      this.id = params.id;
      this.http.getPost(this.id).subscribe(res => {
        this.post = res;
      });
    });
  }



}

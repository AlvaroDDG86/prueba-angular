import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Post } from 'src/app/modelos/post';
import { InfoHeader } from 'src/app/modelos/infoheader';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  id: number;
  post: Post;
  @Output() postLoaded: EventEmitter<InfoHeader> = new EventEmitter();
  @Output() postDeleted: EventEmitter<number> = new EventEmitter();
  constructor(private http: HttpService, private aRouter: ActivatedRoute, private router: Router, private toast: ToastService) { }

  ngOnInit() {
    this.aRouter.params.subscribe(params => {
      this.id = params.id;
      this.http.getPost(this.id).subscribe(res => {
        this.post = res;
        const infoHeader: InfoHeader = {
          idPost: this.id
        };
        this.postLoaded.emit(infoHeader);
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

  volver() {
    this.router.navigate(['dashboard', 'posts']);
  }

}

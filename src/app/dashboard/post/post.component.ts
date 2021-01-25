import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Post } from 'src/app/modelos/post';
import { Comentario } from 'src/app/modelos/comentario';
import { InfoHeader } from 'src/app/modelos/infoheader';
import { ToastService } from 'src/app/services/toast.service';

import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  id: number;
  post: Post;
  idFilter: number;
  comentarios: Comentario[];
  @Output() postLoaded: EventEmitter<InfoHeader> = new EventEmitter();
  @Output() postDeleted: EventEmitter<number> = new EventEmitter();
  constructor(private http: HttpService, private aRouter: ActivatedRoute, private router: Router, private toast: ToastService) { }

  async ngOnInit() {
    this.aRouter.params.subscribe(params => {
      this.id = params.id;
      this.idFilter = parseInt(params.comment);
      forkJoin(this.http.getPost(this.id), this.http.getComentsByPost(this.id))
      .subscribe(res => {
        this.post = res[0];
        const infoHeader: InfoHeader = {
          idPost: this.id
        };
        this.postLoaded.emit(infoHeader);
        if (res[1].length > 0) {
          this.comentarios = res[1];
        } else {
          this.toast.show('No se han enontrado comentarios para el post ' + this.id, '', 3);
        }
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });

  }

  volver() {
    if (this.idFilter === -1) {
      this.router.navigate(['dashboard', 'posts']);
    } else {
      this.router.navigate(['dashboard', 'comentarios', this.idFilter]);
    }
   
  }

}

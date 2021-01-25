import { Component, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Comentario } from 'src/app/modelos/comentario';
import { EventEmitter } from '@angular/core';
import { InfoHeader } from 'src/app/modelos/infoheader';
import { ToastService } from 'src/app/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {
  comentarios: Comentario[] = [];
  id: number = null;
  p: number = 1;
  @Output() postFiltered: EventEmitter<InfoHeader> = new EventEmitter();

  constructor(private http: HttpService, private toast: ToastService, private router: Router, private aRouter: ActivatedRoute) { }

  ngOnInit() {
    this.aRouter.params.subscribe(params => {
      this.id = parseInt(params.id);
      if (this.id !== 0) {
        this.buscarComentarios(this.id);
      } else {
        this.id = null;
        this.getComentarios();
      }
    });
  }

  showPost(id: number) {
    this.router.navigate(['dashboard', 'post', id, this.id ? this.id : 0]);
  }

  getComentarios() {
    this.http.getAllComents().subscribe(res => {
      this.comentarios = res;
    }, error => {
      this.toast.show(error.toString(), 'Error Comentarios', 2);
      console.log(error);
    });
  }

  buscarComentarios(value: number) {
    if (!value) {
      this.getComentarios();
      this.postFiltered.emit(null);
    }
    this.http.getComentsByPost(value).subscribe(res => {
      if (res.length > 0) {
        this.comentarios = res;
        const infoHeader: InfoHeader = {
          idPost: value,
          commentsLength: res.length
        };
        this.postFiltered.emit(infoHeader);
      } else {
        this.toast.show('No se han enontrado comentarios para el post ' + value, '', 3);
      }
    }, error => {
      this.toast.show(error.toString(), 'Error Comentarios', 2);
      console.log(error);
    });
  }
}

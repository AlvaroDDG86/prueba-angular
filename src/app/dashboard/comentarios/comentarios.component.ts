import { Component, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Comentario } from 'src/app/modelos/comentario';
import { EventEmitter } from '@angular/core';
import { InfoHeader } from 'src/app/modelos/infoheader';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {
  comentarios: Comentario[] = [];
  @Output() postFiltered: EventEmitter<InfoHeader> = new EventEmitter();

  constructor(private http: HttpService, private toast: ToastService) { }

  ngOnInit() {
    this.getComentarios();
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
        this.toast.show('No se han ecnontrado comentarios para el post ' + value, 'Error Comentarios', 3);
        console.log('No se han ecnontrado comentarios para el post ' + value);
      }
    }, error => {
      this.toast.show(error.toString(), 'Error Comentarios', 2);
      console.log(error);
    });
  }
}

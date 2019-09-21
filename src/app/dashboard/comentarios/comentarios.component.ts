import { Component, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Comentario } from 'src/app/modelos/comentario';
import { EventEmitter } from '@angular/core';
import { InfoHeader } from 'src/app/modelos/infoheader';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {
  comentarios: Comentario[] = [];
  @Output() postFiltered: EventEmitter<InfoHeader> = new EventEmitter();

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.getComentarios();
  }

  getComentarios() {
    this.http.getAllComents().subscribe(res => {
      this.comentarios = res;
    }, error => {
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
        console.log('No se han ecnontrado comentarios para el post ' + value);
      }
    }, error => {
      console.log(error);
    });
  }
}

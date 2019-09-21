import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Comentario } from 'src/app/modelos/comentario';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {
  comentarios: Comentario[] = [];
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.getComentarios();
  }

  getComentarios() {
    this.http.getAllComents().subscribe(res => {
      this.comentarios = res;
    });
  }

  buscarComentarios(value: number) {
    this.http.getComentsByPost(value).subscribe(res => {
      debugger;
      this.comentarios = res;
    });
  }
}

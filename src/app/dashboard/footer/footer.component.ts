import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() idPostEliminar: number;
  @Output() postDeleted: EventEmitter<boolean> = new EventEmitter();
  constructor(private http: HttpService) { }

  ngOnInit() {
  }

  nuevoPost() {

  }

  eliminarPost() {
    this.http.deletePost(this.idPostEliminar).subscribe(res => {
      if (res) {
        console.log('post Eliminado');
        this.postDeleted.emit(true);
      }
    }, error => {
      console.log(error);
    });
  }

}

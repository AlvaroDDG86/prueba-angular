import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { AccionesService } from 'src/app/services/acciones.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() idPostEliminar: number;
  constructor(private http: HttpService, private toast: ToastService, private router: Router, private acciones: AccionesService) { }

  ngOnInit() {
  }

  nuevoPost() {
    this.router.navigate(['dashboard', 'nuevo']);
  }

  eliminarPostEvent() {
    this.http.deletePost(this.idPostEliminar).subscribe(res => {
      if (res) {
        this.toast.show('Post Eliminado', 'Id post ' + this.idPostEliminar, 1);
        this.acciones.addIdEliminar(this.idPostEliminar);
        this.router.navigate(['dashboard', 'posts']);
      }
    }, error => {
      this.toast.show(error.toString(), 'Error Post', 2);
      console.log(error);
    });
  }

}

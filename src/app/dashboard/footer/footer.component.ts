import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() idPostEliminar: number;
  constructor(private http: HttpService, private toast: ToastService, private router: Router) { }

  ngOnInit() {
  }

  nuevoPost() {

  }

  eliminarPostEvent() {
    this.http.deletePost(this.idPostEliminar).subscribe(res => {
      if (res) {
        this.toast.show('Post Eliminado', 'Id post ' + this.idPostEliminar, 1);
        debugger;
        this.router.navigate(['dashboard', 'posts'], { queryParams: { idEliminar : this.idPostEliminar }});
      }
    }, error => {
      this.toast.show(error.toString(), 'Error Post', 2);
      console.log(error);
    });
  }

}

import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  /**
   * @param titulo Texto para mostrar en el título
   * @param body Texto para mostrar en el contenido del toast
   * @param tipo Tipo de toast (1: success, 2: error, 3: info)
   */
  show(titulo?: string, body?: string, tipo: number = 1) {
    switch (tipo) {
      case 1:
        this.toastr.success(body, titulo);
        break;
      case 2:
        this.toastr.error(body, titulo);
        break;
      case 3:
          this.toastr.info(body, titulo);
          break;
    }

  }
}

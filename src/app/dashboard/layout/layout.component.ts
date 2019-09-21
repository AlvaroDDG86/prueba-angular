import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { InfoHeader } from 'src/app/modelos/infoheader';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  infoHeader: InfoHeader;
  idPostEliminar: number;
  constructor() { }

  ngOnInit() {
  }

  onActivate(componentReference) {
    console.log(componentReference);
    if (componentReference.postFiltered) {
      componentReference.postFiltered.subscribe(data => {
        this.infoHeader = data;
      });
    } else if (componentReference.postLoaded) {
      componentReference.postLoaded.subscribe(data => {
        this.infoHeader = data;
        this.idPostEliminar = this.infoHeader.idPost;
      });
    } else {
      this.infoHeader = null;
      this.idPostEliminar = null;
    }
 }
}

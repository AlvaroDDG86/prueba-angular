import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ADMIN } from 'src/app/constantes/constantes';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  showLink: boolean;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.showLink = (this.authService.getRol() === ADMIN);
  }

  go(ruta: string) {
    this.router.navigate([ruta]);
  }
}

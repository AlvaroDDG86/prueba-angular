import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { InfoHeader } from 'src/app/modelos/infoheader';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() infoHeader: InfoHeader;

  nombreUsuario: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.nombreUsuario = this.authService.getUsuario().nombre;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}

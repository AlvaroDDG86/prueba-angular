import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { BehaviorSubject } from 'rxjs';
import { ADMIN, NORMAL, USUARIO, LOGGED } from '../constantes/constantes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rol: string;
  private loggeado = new BehaviorSubject<boolean>(false);
  constructor() {
    if (localStorage.getItem(LOGGED)) {
      this.loggeado.next(true);
      this.rol = this.getUsuario().isAdmin ? ADMIN : NORMAL;
    }
  }

  login(usuario: Usuario) {
    this.rol = usuario.isAdmin ? ADMIN : NORMAL;
    localStorage.setItem(USUARIO, JSON.stringify(usuario));
    localStorage.setItem(LOGGED, '1');
    this.loggeado.next(true);
  }

  logout() {
    localStorage.removeItem(USUARIO);
    localStorage.removeItem(LOGGED);
    this.loggeado.next(false);
  }

  isLogged() {
    return this.loggeado.value;
  }

  getRol() {
    return this.rol;
  }

  getUsuario(): Usuario {
    return JSON.parse(localStorage.getItem(USUARIO));
  }
}

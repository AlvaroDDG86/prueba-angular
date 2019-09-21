import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../modelos/usuario';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuario: Usuario = {
    nombre: '',
    password: '',
    isAdmin: false
  };
  loginForm = new FormGroup({
    nombre: new FormControl(this.usuario.nombre, [
      Validators.required
    ]),
    password: new FormControl(this.usuario.password, [
      Validators.required
    ]),
    isAdmin: new FormControl(this.usuario.isAdmin)
  });
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.loginForm.value);
    this.authService.login(this.loginForm.value).then(res => {
      if ( res ) {
        this.router.navigate(['dashboard', 'posts']);
      } else {
        console.log('No se ha podido loggear');
      }
    }).catch(error => {
      console.log(error);
    });
  }
}

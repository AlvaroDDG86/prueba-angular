import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../modelos/usuario';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuario: Usuario = {
    nombre: '',
    password: '',
    isAdmin: false,
    id: 1
  };
  loginForm = new FormGroup({
    nombre: new FormControl(this.usuario.nombre, [
      Validators.required
    ]),
    password: new FormControl(this.usuario.password, [
      Validators.required
    ]),
    isAdmin: new FormControl(this.usuario.isAdmin),
    id: new FormControl(this.usuario.id)
  });
  constructor(private authService: AuthService, private router: Router, private toast: ToastService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.spinner.show(); // Esto no haría falta, porque está metido en el interceptor, pero para simular una llamada se muestra el loader.
    this.authService.login(this.loginForm.value).then(res => {
      this.spinner.hide();
      if ( res ) {
        this.router.navigate(['dashboard', 'posts']);
      } else {
        this.toast.show('No se ha podido loggear', 'Error Login', 2);
        console.log('No se ha podido loggear');
      }
    }).catch(error => {
      this.toast.show('No se ha podido loggear', 'Error Login', 2);
      console.log(error);
    });
  }
}

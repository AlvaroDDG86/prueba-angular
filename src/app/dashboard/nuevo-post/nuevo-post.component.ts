import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/modelos/post';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { HttpService } from 'src/app/services/http.service';
import { AccionesService } from 'src/app/services/acciones.service';

@Component({
  selector: 'app-nuevo-post',
  templateUrl: './nuevo-post.component.html',
  styleUrls: ['./nuevo-post.component.scss']
})
export class NuevoPostComponent implements OnInit {
  idUsuario: number;
  post: Post = {
    userId: 1,
    title: '',
    body: ''
  };
  postForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private authService: AuthService, private router: Router, private toast: ToastService, private http: HttpService,  private acciones: AccionesService) { }

  ngOnInit() {
    this.idUsuario = this.authService.getUsuario().id;
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, [
        Validators.required
      ]),
      body: new FormControl(this.post.body, [
        Validators.required
      ]),
      userId: new FormControl(this.idUsuario)
    });
  }

  onSubmit() {
    this.http.addPost(this.postForm.value).subscribe(res => {
      if (res) {
        this.toast.show('Post agregado correctamente', 'ID: ' +  res.id, 1);
        this.router.navigate(['dashboard', 'posts']);
        this.acciones.addPostAgregar(res);
      }
    }, error => {
      console.log(error);
    });
  }
}

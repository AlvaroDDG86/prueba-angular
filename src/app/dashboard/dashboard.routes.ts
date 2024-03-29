import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PostsComponent } from './posts/posts.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { AuthGuard } from '../guards/auth-guard.service';
import { RolesService } from '../guards/roles.service';
import { ADMIN } from '../constantes/constantes';
import { PostComponent } from './post/post.component';
import { NuevoPostComponent } from './nuevo-post/nuevo-post.component';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'posts', pathMatch: 'full'},
      { path: 'posts', component: PostsComponent, canActivate: [AuthGuard]},
      { path: 'post/:id/:comment', component: PostComponent, canActivate: [AuthGuard]},
      { path: 'nuevo', component: NuevoPostComponent, canActivate: [AuthGuard]},
      {
        path: 'comentarios/:id',
        component: ComentariosComponent,
        canActivate: [RolesService],
        data: {rol: ADMIN}
      }
    ],
  }
];

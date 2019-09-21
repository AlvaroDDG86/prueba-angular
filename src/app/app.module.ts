import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './dashboard/post/post.component';
import { ComentariosComponent } from './dashboard/comentarios/comentarios.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { PostsComponent } from './dashboard/posts/posts.component';

import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { DashboardModule } from './dashboard/dashboard.module';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './dashboard/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PostComponent,
    ComentariosComponent,
    HeaderComponent,
    SidebarComponent,
    PostsComponent,
    LayoutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    DashboardModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

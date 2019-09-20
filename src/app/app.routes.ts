import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: LoginComponent }
];

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard.routes';
import { AuthGuard } from '../guards/auth-guard.service';
import { RolesService } from '../guards/roles.service';
import { NuevoPostComponent } from './nuevo-post/nuevo-post.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [NuevoPostComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(dashboardRoutes),
  ],
  providers: [AuthGuard, RolesService],
})
export class DashboardModule { }

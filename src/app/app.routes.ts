import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { RoleManagementComponent } from './admin/role-management/role-management.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProjectListComponent } from './admin/projects/project-list/project-list.component';
import { ProjectFormComponent } from './admin/projects/project-form/project-form.component';
import { AdminLayoutComponent } from './admin/layout/admin-layout.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UserManagementComponent },
      { path: 'roles', component: RoleManagementComponent },
      { path: 'projects', component: ProjectListComponent },
      { path: 'projects/create', component: ProjectFormComponent },
      { path: 'projects/edit/:id', component: ProjectFormComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
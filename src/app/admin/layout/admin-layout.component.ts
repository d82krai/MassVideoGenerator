import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="wrapper">
      <!-- Navbar -->
      <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="#" (click)="logout($event)">
              <i class="fas fa-sign-out-alt"></i> Logout
            </a>
          </li>
        </ul>
      </nav>

      <!-- Main Sidebar Container -->
      <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <a href="#" class="brand-link">
          <span class="brand-text font-weight-light">AdminLTE 3</span>
        </a>

        <div class="sidebar">
          <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
              <li class="nav-item">
                <a [routerLink]="['/admin/dashboard']" routerLinkActive="active" class="nav-link">
                  <i class="nav-icon fas fa-tachometer-alt"></i>
                  <p>Dashboard</p>
                </a>
              </li>
              <li class="nav-item">
                <a [routerLink]="['/admin/projects']" routerLinkActive="active" class="nav-link">
                  <i class="nav-icon fas fa-project-diagram"></i>
                  <p>Projects</p>
                </a>
              </li>
              <li class="nav-item">
                <a [routerLink]="['/admin/users']" routerLinkActive="active" class="nav-link">
                  <i class="nav-icon fas fa-users"></i>
                  <p>Users</p>
                </a>
              </li>
              <li class="nav-item">
                <a [routerLink]="['/admin/roles']" routerLinkActive="active" class="nav-link">
                  <i class="nav-icon fas fa-user-tag"></i>
                  <p>Roles</p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <!-- Content -->
      <router-outlet></router-outlet>

      <!-- Footer -->
      <footer class="main-footer">
        <div class="float-right d-none d-sm-block">
          <b>Version</b> 3.2.0
        </div>
        <strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong> All rights reserved.
      </footer>
    </div>
  `
})
export class AdminLayoutComponent {
  constructor(private auth: AuthService, private router: Router) {}

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
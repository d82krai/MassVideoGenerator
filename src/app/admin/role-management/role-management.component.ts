import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1>Role Management</h1>
            </div>
          </div>
        </div>
      </section>

      <section class="content">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Roles</h3>
            <div class="card-tools">
              <button type="button" class="btn btn-primary">Add New Role</button>
            </div>
          </div>
          <div class="card-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let role of roles">
                  <td>{{role.id}}</td>
                  <td>{{role.name}}</td>
                  <td>{{role.description}}</td>
                  <td>
                    <button class="btn btn-sm btn-info mr-2">Edit</button>
                    <button class="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  `
})
export class RoleManagementComponent implements OnInit {
  roles = [
    { id: 1, name: 'Admin', description: 'Full system access' },
    { id: 2, name: 'User', description: 'Limited access' }
  ];

  ngOnInit() {}
}
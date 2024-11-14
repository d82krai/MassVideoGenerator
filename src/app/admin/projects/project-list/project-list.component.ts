import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Project } from '../project.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1>Projects</h1>
            </div>
            <div class="col-sm-6">
              <div class="float-right">
                <a [routerLink]="['/admin/projects/create']" class="btn btn-primary">
                  <i class="fas fa-plus"></i> Create New Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="content">
        <div class="card">
          <div class="card-body p-0">
            <table class="table table-striped projects">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Scenes</th>
                  <th>Status</th>
                  <th>Created On</th>
                  <th>Created By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let project of projects">
                  <td>
                    <a>{{project.name}}</a>
                    <br>
                    <small>{{project.scenes.length}} scenes</small>
                  </td>
                  <td>
                    <ul class="list-inline">
                      <li class="list-inline-item" *ngFor="let scene of project.scenes.slice(0,3)">
                        <img [src]="scene.thumbnail" alt="Scene" class="table-avatar">
                      </li>
                    </ul>
                  </td>
                  <td>
                    <span class="badge" [ngClass]="{
                      'badge-success': project.status === 'Active',
                      'badge-warning': project.status === 'Draft',
                      'badge-danger': project.status === 'Inactive'
                    }">{{project.status}}</span>
                  </td>
                  <td>{{project.createdOn | date}}</td>
                  <td>{{project.createdBy}}</td>
                  <td class="project-actions">
                    <a class="btn btn-info btn-sm" [routerLink]="['/admin/projects/edit', project.id]">
                      <i class="fas fa-pencil-alt"></i> Edit
                    </a>
                    <button class="btn btn-danger btn-sm ml-1" (click)="deleteProject(project.id)">
                      <i class="fas fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .table-avatar {
      border-radius: 50%;
      width: 30px;
      height: 30px;
      margin-right: 5px;
    }
  `]
})
export class ProjectListComponent {
  projects: Project[] = [
    {
      id: '1',
      name: 'Welcome Campaign',
      files: [
        { name: 'background.mp4', path: '/assets/videos/bg.mp4', size: 1024 }
      ],
      dataFields: ['CustomerId', 'Name', 'Age', 'CustomerType', 'Profession'],
      scenes: [
        {
          name: 'Intro',
          thumbnail: 'https://via.placeholder.com/30',
          sequenceOrder: 1,
          sceneLength: 10,
          conditions: ['CustomerType == "New"']
        }
      ],
      status: 'Active',
      settings: {
        outputFileType: 'MP4',
        resolution: '1080p'
      },
      createdOn: new Date('2024-01-15'),
      createdBy: 'John Doe'
    }
  ];

  deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projects = this.projects.filter(p => p.id !== id);
    }
  }
}
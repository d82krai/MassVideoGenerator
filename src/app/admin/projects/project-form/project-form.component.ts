import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, ProjectScene } from '../project.model';
import { TimelineComponent } from '../timeline/timeline.component';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TimelineComponent],
  template: `
    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1>{{ isEditMode ? 'Edit' : 'Create' }} Project</h1>
            </div>
          </div>
        </div>
      </section>

      <section class="content">
        <div class="row">
          <!-- Left side - Project Form -->
          <div class="col-md-8">
            <div class="card">
              <div class="card-body">
                <form (ngSubmit)="onSubmit()">
                  <div class="form-group">
                    <label for="name">Project Name</label>
                    <input type="text" class="form-control" id="name" [(ngModel)]="project.name" name="name" required>
                  </div>

                  <!-- Timeline Component -->
                  <app-timeline [(scenes)]="project.scenes"></app-timeline>

                  <div class="form-group">
                    <label>Data Fields</label>
                    <div class="input-group mb-2" *ngFor="let field of project.dataFields; let i = index">
                      <input type="text" class="form-control" [(ngModel)]="project.dataFields[i]" [name]="'field' + i">
                      <div class="input-group-append">
                        <button type="button" class="btn btn-danger" (click)="removeDataField(i)">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                    <button type="button" class="btn btn-secondary" (click)="addDataField()">
                      <i class="fas fa-plus"></i> Add Field
                    </button>
                  </div>

                  <div class="form-group">
                    <label>Settings</label>
                    <div class="row">
                      <div class="col-md-6">
                        <label for="outputFileType">Output File Type</label>
                        <select class="form-control" id="outputFileType" [(ngModel)]="project.settings.outputFileType" name="outputFileType">
                          <option value="MP4">MP4</option>
                          <option value="MOV">MOV</option>
                          <option value="AVI">AVI</option>
                        </select>
                      </div>
                      <div class="col-md-6">
                        <label for="resolution">Resolution</label>
                        <select class="form-control" id="resolution" [(ngModel)]="project.settings.resolution" name="resolution">
                          <option value="720p">720p</option>
                          <option value="1080p">1080p</option>
                          <option value="4K">4K</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button type="submit" class="btn btn-primary">Save Project</button>
                </form>
              </div>
            </div>
          </div>

          <!-- Right side - Preview Panel -->
          <div class="col-md-4">
            <div class="card">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h3 class="card-title">Preview</h3>
                <button class="btn btn-primary btn-sm" (click)="runPreview()">
                  <i class="fas fa-play mr-1"></i> Run Preview
                </button>
              </div>
              <div class="card-body">
                <div class="video-preview mb-3">
                  <video #videoPlayer class="w-100" controls>
                    <source src="https://via.placeholder.com/400x225" type="video/mp4">
                    Your browser does not support the video tag.
                  </video>
                  <div class="d-flex justify-content-between mt-2">
                    <button class="btn btn-sm btn-info" (click)="previousScene()">
                      <i class="fas fa-step-backward"></i>
                    </button>
                    <span>Scene {{currentSceneIndex + 1}} of {{project.scenes.length}}</span>
                    <button class="btn btn-sm btn-info" (click)="nextScene()">
                      <i class="fas fa-step-forward"></i>
                    </button>
                  </div>
                </div>

                <div class="preview-data">
                  <h5>Test Data</h5>
                  <div class="form-group" *ngFor="let field of project.dataFields">
                    <label [for]="'test_' + field">{{field}}</label>
                    <input 
                      [type]="getInputType(field)"
                      class="form-control"
                      [id]="'test_' + field"
                      [(ngModel)]="testData[field]"
                      [name]="'test_' + field"
                      (change)="updatePreview()">
                  </div>

                  <div class="scene-conditions mt-3" *ngIf="currentScene">
                    <h5>Current Scene Conditions</h5>
                    <div class="alert" [ngClass]="conditionsMet ? 'alert-success' : 'alert-warning'">
                      <div *ngFor="let condition of currentScene.conditions">
                        <i class="fas" [ngClass]="conditionsMet ? 'fa-check' : 'fa-exclamation-triangle'"></i>
                        {{condition}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .video-preview {
      background: #f8f9fa;
      padding: 10px;
      border-radius: 4px;
    }
    .preview-data {
      max-height: calc(100vh - 500px);
      overflow-y: auto;
    }
  `]
})
export class ProjectFormComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  
  isEditMode = false;
  project: Project = {
    id: '',
    name: '',
    files: [],
    dataFields: ['CustomerId', 'Name', 'Age', 'CustomerType', 'Profession'],
    scenes: [],
    status: 'Draft',
    settings: {
      outputFileType: 'MP4',
      resolution: '1080p'
    },
    createdOn: new Date(),
    createdBy: 'Current User'
  };

  currentSceneIndex = 0;
  testData: { [key: string]: any } = {};
  conditionsMet = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      // Load project data here
    }
    this.initializeTestData();
  }

  get currentScene(): ProjectScene | undefined {
    return this.project.scenes[this.currentSceneIndex];
  }

  initializeTestData() {
    this.project.dataFields.forEach(field => {
      this.testData[field] = '';
    });
  }

  onSubmit() {
    // Save project logic here
    this.router.navigate(['/admin/projects']);
  }

  addDataField() {
    this.project.dataFields.push('New Field');
  }

  removeDataField(index: number) {
    this.project.dataFields.splice(index, 1);
  }

  getInputType(field: string): string {
    if (field.toLowerCase().includes('age')) return 'number';
    return 'text';
  }

  runPreview() {
    console.log('Running preview with test data:', this.testData);
    this.updatePreview();
  }

  updatePreview() {
    if (this.currentScene) {
      // Update preview logic here
      this.evaluateConditions();
    }
  }

  evaluateConditions() {
    if (!this.currentScene) return;
    
    // Simple condition evaluation example
    this.conditionsMet = this.currentScene.conditions.every(condition => {
      // Basic condition evaluation logic
      if (condition.includes('CustomerType')) {
        return this.testData['CustomerType'] === condition.split('==')[1].trim().replace(/"/g, '');
      }
      return true;
    });
  }

  previousScene() {
    if (this.currentSceneIndex > 0) {
      this.currentSceneIndex--;
      this.updatePreview();
    }
  }

  nextScene() {
    if (this.currentSceneIndex < this.project.scenes.length - 1) {
      this.currentSceneIndex++;
      this.updatePreview();
    }
  }
}
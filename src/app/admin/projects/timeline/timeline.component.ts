import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectScene } from '../project.model';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="timeline-container">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0">Video Timeline</h5>
        <div class="d-flex align-items-center">
          <div class="zoom-control mr-3">
            <label class="mr-2 mb-0">Zoom:</label>
            <input 
              type="range" 
              class="custom-range" 
              [min]="minZoom"
              [max]="maxZoom"
              step="0.1"
              [(ngModel)]="zoomLevel"
              (input)="updateZoom()">
          </div>
          <button type="button" class="btn btn-primary btn-sm" (click)="showAddSceneModal($event)">
            <i class="fas fa-plus"></i> Add Scene
          </button>
        </div>
      </div>

      <!-- Timeline -->
      <div class="timeline-scroll-container">
        <div #timelineWrapper class="timeline-wrapper" (dragover)="onDragOver($event)">
          <div class="scene-blocks" [style.width]="timelineWidth + 'px'">
            <div *ngFor="let scene of scenes; let i = index"
                class="scene-block"
                [style.width]="getSceneWidth(scene)"
                [style.left]="getScenePosition(scene)"
                [class.active]="i === activeSceneIndex"
                draggable="true"
                (dragstart)="onDragStart(i, $event)"
                (dragend)="onDragEnd()"
                (dragover)="onDragOver($event)"
                (drop)="onDrop($event)">
              <div class="scene-thumbnail">
                <img [src]="scene.thumbnail" [alt]="scene.name">
                <span class="scene-duration">{{formatDuration(scene.sceneLength)}}</span>
                <div class="scene-overlay">
                  <button type="button" class="btn btn-sm btn-light mr-1" (click)="playScene(i, $event)">
                    <i class="fas fa-play"></i>
                  </button>
                  <button type="button" class="btn btn-sm btn-light" (click)="editScene(i, $event)">
                    <i class="fas fa-edit"></i>
                  </button>
                </div>
              </div>
              <div class="scene-info">
                <span class="scene-name">{{scene.name}}</span>
                <button type="button" class="btn btn-danger btn-sm" (click)="removeScene(i, $event)">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="timeline-ruler" [style.width]="timelineWidth + 'px'">
            <div *ngFor="let mark of timeMarks" 
                class="time-mark" 
                [style.left]="mark.position + 'px'">
              {{mark.label}}
            </div>
          </div>
        </div>
      </div>

      <!-- Add Scene Modal -->
      <div class="modal" [class.show]="showModal" [style.display]="showModal ? 'block' : 'none'">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add New Scene</h5>
              <button type="button" class="close" (click)="hideAddSceneModal($event)">
                <span>&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="sceneSelect">Select Scene</label>
                <select class="form-control" id="sceneSelect" [(ngModel)]="selectedSceneTemplate">
                  <option value="">Choose a scene...</option>
                  <option *ngFor="let template of sceneTemplates" [value]="template.id">
                    {{template.name}}
                  </option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="hideAddSceneModal($event)">Cancel</button>
              <button type="button" class="btn btn-primary" (click)="addScene($event)" [disabled]="!selectedSceneTemplate">
                Add Scene
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show" *ngIf="showModal"></div>
    </div>
  `,
  styles: [`
    .timeline-container {
      background: #fff;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2);
      margin-bottom: 1rem;
    }

    .timeline-scroll-container {
      overflow-x: auto;
      position: relative;
      margin-bottom: 10px;
    }

    .timeline-wrapper {
      position: relative;
      background: #2c3e50;
      border-radius: 4px;
      padding: 10px;
      min-height: 120px;
      width: 100%;
    }

    .scene-blocks {
      position: relative;
      height: 100px;
      margin-bottom: 20px;
    }

    .scene-block {
      position: absolute;
      background: #34495e;
      border-radius: 4px;
      padding: 5px;
      cursor: move;
      transition: transform 0.3s ease;
      min-width: 150px;
      top: 0;
      height: 100%;
    }

    .scene-block.active {
      border: 2px solid #3498db;
    }

    .scene-block:hover {
      transform: translateY(-2px);
    }

    .scene-thumbnail {
      position: relative;
      margin-bottom: 5px;
      height: 60px;
      overflow: hidden;
    }

    .scene-thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 3px;
    }

    .scene-overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity 0.3s ease;
      background: rgba(0,0,0,0.5);
      padding: 5px;
      border-radius: 4px;
    }

    .scene-thumbnail:hover .scene-overlay {
      opacity: 1;
    }

    .scene-duration {
      position: absolute;
      bottom: 5px;
      right: 5px;
      background: rgba(0,0,0,0.7);
      color: white;
      padding: 2px 4px;
      border-radius: 2px;
      font-size: 0.8em;
    }

    .scene-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .scene-name {
      color: white;
      font-size: 0.9em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 70px;
    }

    .timeline-ruler {
      position: relative;
      height: 30px;
      border-top: 1px solid #7f8c8d;
    }

    .time-mark {
      position: absolute;
      transform: translateX(-50%);
      color: #bdc3c7;
      font-size: 0.8em;
      border-left: 1px solid #7f8c8d;
      padding-left: 2px;
      height: 10px;
      top: 0;
    }

    .time-mark:nth-child(2n+1) {
      height: 15px;
    }

    .modal {
      background-color: rgba(0,0,0,0.5);
    }

    .zoom-control {
      width: 150px;
    }

    .custom-range {
      height: calc(1rem + 0.2rem);
    }
  `]
})
export class TimelineComponent implements AfterViewInit {
  @ViewChild('timelineWrapper') timelineWrapper!: ElementRef;
  @Input() scenes: ProjectScene[] = [];
  @Output() scenesChange = new EventEmitter<ProjectScene[]>();
  @Output() playSceneEvent = new EventEmitter<number>();
  @Output() editSceneEvent = new EventEmitter<number>();
  
  showModal = false;
  selectedSceneTemplate = '';
  activeSceneIndex = -1;
  draggedSceneIndex: number | null = null;
  dragStartX = 0;
  timelineWidth = 1000; // Base width
  pixelsPerSecond = 100; // Base scale
  zoomLevel = 1;
  minZoom = 0.5;
  maxZoom = 2;
  timeMarks: { position: number; label: string }[] = [];
  
  sceneTemplates = Array.from({ length: 10 }, (_, i) => ({
    id: `scene${i + 1}`,
    name: `Scene Template ${i + 1}`,
    thumbnail: `https://picsum.photos/100/60?random=${i}`,
    duration: Math.floor(Math.random() * 20) + 5
  }));

  ngAfterViewInit() {
    this.updateTimelineWidth();
    this.updateTimeMarks();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateTimelineWidth();
    this.updateTimeMarks();
  }

  updateTimelineWidth() {
    const totalDuration = this.scenes.reduce((sum, scene) => sum + scene.sceneLength, 0);
    this.timelineWidth = Math.max(
      this.timelineWrapper.nativeElement.offsetWidth,
      totalDuration * this.pixelsPerSecond * this.zoomLevel
    );
  }

  updateZoom() {
    this.updateTimelineWidth();
    this.updateTimeMarks();
  }

  updateTimeMarks() {
    const totalSeconds = this.timelineWidth / (this.pixelsPerSecond * this.zoomLevel);
    const interval = this.getOptimalInterval(totalSeconds);
    const markCount = Math.ceil(totalSeconds / interval);
    
    this.timeMarks = Array.from({ length: markCount + 1 }, (_, i) => {
      const time = i * interval;
      const position = time * this.pixelsPerSecond * this.zoomLevel;
      return {
        position,
        label: this.formatDuration(time)
      };
    });
  }

  getOptimalInterval(totalSeconds: number): number {
    const targetMarks = 20; // Desired number of marks
    const baseInterval = totalSeconds / targetMarks;
    
    // Round to nearest "nice" number
    const intervals = [0.1, 0.2, 0.5, 1, 2, 5, 10, 15, 30, 60];
    return intervals.find(i => i >= baseInterval) || intervals[intervals.length - 1];
  }

  getSceneWidth(scene: ProjectScene): string {
    return `${scene.sceneLength * this.pixelsPerSecond * this.zoomLevel}px`;
  }

  getScenePosition(scene: ProjectScene): string {
    const position = this.scenes
      .slice(0, this.scenes.indexOf(scene))
      .reduce((sum, s) => sum + s.sceneLength, 0);
    return `${position * this.pixelsPerSecond * this.zoomLevel}px`;
  }

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}:${remainingSeconds.toFixed(1)}`;
    }
    return remainingSeconds.toFixed(1) + 's';
  }

  onDragStart(index: number, event: DragEvent) {
    this.draggedSceneIndex = index;
    this.dragStartX = event.clientX;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (this.draggedSceneIndex === null) return;

    const timelineRect = this.timelineWrapper.nativeElement.getBoundingClientRect();
    const dropX = event.clientX - timelineRect.left;
    const newPosition = dropX / (this.pixelsPerSecond * this.zoomLevel);
    
    // Find the new index based on position
    let newIndex = 0;
    let currentPosition = 0;
    
    for (let i = 0; i < this.scenes.length; i++) {
      if (i === this.draggedSceneIndex) continue;
      if (currentPosition + (this.scenes[i].sceneLength / 2) > newPosition) break;
      currentPosition += this.scenes[i].sceneLength;
      newIndex++;
    }

    if (newIndex !== this.draggedSceneIndex) {
      const [movedScene] = this.scenes.splice(this.draggedSceneIndex, 1);
      this.scenes.splice(newIndex, 0, movedScene);
      this.scenes.forEach((scene, i) => scene.sequenceOrder = i + 1);
      this.scenesChange.emit(this.scenes);
    }
  }

  onDragEnd() {
    this.draggedSceneIndex = null;
  }

  showAddSceneModal(event: Event) {
    event.preventDefault();
    this.showModal = true;
  }

  hideAddSceneModal(event: Event) {
    event.preventDefault();
    this.showModal = false;
    this.selectedSceneTemplate = '';
  }

  addScene(event: Event) {
    event.preventDefault();
    const template = this.sceneTemplates.find(t => t.id === this.selectedSceneTemplate);
    if (template) {
      const newScene: ProjectScene = {
        name: template.name,
        thumbnail: template.thumbnail,
        sequenceOrder: this.scenes.length + 1,
        sceneLength: template.duration,
        conditions: []
      };
      this.scenes.push(newScene);
      this.scenesChange.emit(this.scenes);
      this.updateTimelineWidth();
      this.updateTimeMarks();
    }
    this.hideAddSceneModal(event);
  }

  removeScene(index: number, event: Event) {
    event.preventDefault();
    this.scenes.splice(index, 1);
    this.scenes.forEach((scene, i) => scene.sequenceOrder = i + 1);
    this.scenesChange.emit(this.scenes);
    this.updateTimelineWidth();
    this.updateTimeMarks();
  }

  playScene(index: number, event: Event) {
    event.preventDefault();
    this.playSceneEvent.emit(index);
  }

  editScene(index: number, event: Event) {
    event.preventDefault();
    this.editSceneEvent.emit(index);
  }
}
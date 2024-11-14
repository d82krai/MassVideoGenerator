import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Dashboard</h1>
            </div>
          </div>
        </div>
      </div>

      <section class="content">
        <div class="container-fluid">
          <!-- Info boxes -->
          <div class="row">
            <div class="col-12 col-sm-6 col-md-3">
              <div class="info-box">
                <span class="info-box-icon bg-info"><i class="fas fa-video"></i></span>
                <div class="info-box-content">
                  <span class="info-box-text">Total Videos</span>
                  <span class="info-box-number">15,842</span>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
              <div class="info-box">
                <span class="info-box-icon bg-success"><i class="fas fa-play-circle"></i></span>
                <div class="info-box-content">
                  <span class="info-box-text">Views Today</span>
                  <span class="info-box-number">2,490</span>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
              <div class="info-box">
                <span class="info-box-icon bg-warning"><i class="fas fa-users"></i></span>
                <div class="info-box-content">
                  <span class="info-box-text">Active Users</span>
                  <span class="info-box-number">928</span>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
              <div class="info-box">
                <span class="info-box-icon bg-danger"><i class="fas fa-clock"></i></span>
                <div class="info-box-content">
                  <span class="info-box-text">Avg. Watch Time</span>
                  <span class="info-box-number">2:45</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Charts -->
          <div class="row">
            <div class="col-md-8">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Video Views Over Time</h3>
                </div>
                <div class="card-body">
                  <canvas id="viewsChart" style="height: 300px;"></canvas>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Video Categories</h3>
                </div>
                <div class="card-body">
                  <canvas id="categoriesChart" style="height: 300px;"></canvas>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Videos Table -->
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Recent Videos</h3>
                </div>
                <div class="card-body table-responsive p-0">
                  <table class="table table-hover text-nowrap">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Views</th>
                        <th>Duration</th>
                        <th>Created</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr *ngFor="let video of recentVideos">
                        <td>{{video.title}}</td>
                        <td>{{video.views}}</td>
                        <td>{{video.duration}}</td>
                        <td>{{video.created}}</td>
                        <td><span class="badge" [ngClass]="video.statusClass">{{video.status}}</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  recentVideos = [
    { title: 'Welcome Video', views: '1,245', duration: '2:30', created: '2024-01-15', status: 'Active', statusClass: 'bg-success' },
    { title: 'Product Tutorial', views: '892', duration: '4:15', created: '2024-01-14', status: 'Processing', statusClass: 'bg-warning' },
    { title: 'Customer Story', views: '567', duration: '3:45', created: '2024-01-13', status: 'Active', statusClass: 'bg-success' },
    { title: 'Feature Overview', views: '1,023', duration: '5:00', created: '2024-01-12', status: 'Active', statusClass: 'bg-success' }
  ];

  ngOnInit() {
    this.initViewsChart();
    this.initCategoriesChart();
  }

  initViewsChart() {
    const ctx = document.getElementById('viewsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Video Views',
          data: [12000, 19000, 15000, 25000, 22000, 30000],
          borderColor: '#007bff',
          tension: 0.1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  initCategoriesChart() {
    const ctx = document.getElementById('categoriesChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Tutorials', 'Product Videos', 'Customer Stories', 'Marketing'],
        datasets: [{
          data: [35, 25, 20, 20],
          backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
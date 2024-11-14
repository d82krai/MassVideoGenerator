import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="landing-page">
      <!-- Navigation -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
          <a class="navbar-brand" href="#"><b>Admin</b>LTE</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link" href="#features">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#pricing">Pricing</a>
              </li>
              <li class="nav-item">
                <a [routerLink]="['/login']" class="nav-link">Login</a>
              </li>
              <li class="nav-item">
                <a [routerLink]="['/register']" class="btn btn-light">Sign Up</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="hero bg-light py-5">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <h1 class="display-4 mb-4">Powerful Admin Dashboard Solution</h1>
              <p class="lead mb-4">Streamline your business operations with our comprehensive admin dashboard. Built with modern technologies for optimal performance.</p>
              <a [routerLink]="['/register']" class="btn btn-primary btn-lg mr-3">Get Started</a>
              <a href="#features" class="btn btn-outline-primary btn-lg">Learn More</a>
            </div>
            <div class="col-lg-6">
              <img src="https://adminlte.io/docs/3.1/assets/img/AdminLTELogo.png" alt="Admin Dashboard" class="img-fluid">
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="py-5">
        <div class="container">
          <h2 class="text-center mb-5">Key Features</h2>
          <div class="row">
            <div class="col-md-4 mb-4">
              <div class="card h-100">
                <div class="card-body text-center">
                  <i class="fas fa-users fa-3x mb-3 text-primary"></i>
                  <h4 class="card-title">User Management</h4>
                  <p class="card-text">Efficiently manage users, roles, and permissions with our intuitive interface.</p>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card h-100">
                <div class="card-body text-center">
                  <i class="fas fa-chart-line fa-3x mb-3 text-primary"></i>
                  <h4 class="card-title">Analytics</h4>
                  <p class="card-text">Get detailed insights with our comprehensive analytics and reporting tools.</p>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card h-100">
                <div class="card-body text-center">
                  <i class="fas fa-shield-alt fa-3x mb-3 text-primary"></i>
                  <h4 class="card-title">Security</h4>
                  <p class="card-text">Enterprise-grade security features to protect your valuable data.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing Section -->
      <section id="pricing" class="py-5 bg-light">
        <div class="container">
          <h2 class="text-center mb-5">Pricing Plans</h2>
          <div class="row">
            <div class="col-md-4 mb-4">
              <div class="card h-100">
                <div class="card-body text-center">
                  <h4 class="card-title">Starter</h4>
                  <h2 class="card-price">$29<span>/month</span></h2>
                  <ul class="list-unstyled mt-3 mb-4">
                    <li>Up to 10 users</li>
                    <li>Basic analytics</li>
                    <li>Email support</li>
                  </ul>
                  <a [routerLink]="['/register']" class="btn btn-outline-primary">Get Started</a>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card h-100 border-primary">
                <div class="card-body text-center">
                  <h4 class="card-title">Professional</h4>
                  <h2 class="card-price">$99<span>/month</span></h2>
                  <ul class="list-unstyled mt-3 mb-4">
                    <li>Up to 50 users</li>
                    <li>Advanced analytics</li>
                    <li>Priority support</li>
                  </ul>
                  <a [routerLink]="['/register']" class="btn btn-primary">Get Started</a>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card h-100">
                <div class="card-body text-center">
                  <h4 class="card-title">Enterprise</h4>
                  <h2 class="card-price">$299<span>/month</span></h2>
                  <ul class="list-unstyled mt-3 mb-4">
                    <li>Unlimited users</li>
                    <li>Custom analytics</li>
                    <li>24/7 support</li>
                  </ul>
                  <a [routerLink]="['/register']" class="btn btn-outline-primary">Contact Sales</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-dark text-light py-4">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <h5>About AdminLTE</h5>
              <p>A professional admin dashboard template built with modern technologies.</p>
            </div>
            <div class="col-md-3">
              <h5>Links</h5>
              <ul class="list-unstyled">
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a [routerLink]="['/login']">Login</a></li>
              </ul>
            </div>
            <div class="col-md-3">
              <h5>Contact</h5>
              <ul class="list-unstyled">
                <li>Email: info&#64;adminlte.io</li>
                <li>Phone: (123) 456-7890</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `
})
export class LandingComponent {}
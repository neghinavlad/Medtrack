import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrl: 'dashboard.component.css',
  imports: [
    RouterLink
  ],
  standalone: true
})

export class DashboardComponent{}

import {Component, OnInit} from '@angular/core';
import {Patient} from '../patients.model';
import {PatientsService} from '../patients.service';
import {DatePipe, NgIf} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-patients-view',
  templateUrl: 'patients-view.component.html',
  styleUrl: 'patient-view.component.css',
  imports: [
    NgIf,
    DatePipe,
    HttpClientModule
  ],
  standalone: true
})

export class PatientsViewComponent implements OnInit{
  patients: Patient[] = [];  // Holds list of patients
  isLoading = true;          // Show loading indicator

  constructor(private patientsService: PatientsService) {}

  ngOnInit(): void {
    this.fetchPatients();
  }

  fetchPatients(): void {
    this.patientsService.getPatients().subscribe({
      next: (data) => {
        this.patients = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching patients:', err);
        this.isLoading = false;
      }
    });
  }
}

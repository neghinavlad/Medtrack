import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {Patient} from '../patients.model';
import {PatientsService} from '../patients.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TableModule} from 'primeng/table';
import {Tag} from 'primeng/tag';

@Component({
  selector: 'app-patients-view',
  standalone: true,
  templateUrl: './patients-view.component.html',
  imports: [
    TableModule,
    Tag
  ],
  styleUrl: './patients-view.component.scss'
})

export class PatientsViewComponent implements OnInit {
  patients: Patient[] = [];  // Stores fetched patients
  isLoading = true;  // Loading state

  private destroyRef = inject(DestroyRef);
  private patientsService = inject(PatientsService); // Use inject() for standalone components

  ngOnInit(): void {
    this.fetchPatients();
  }

  getSeverity(status: string) {
    switch (status) {
      case 'LIGHT':
        return 'info';
      case 'MEDIUM':
        return 'warn';
      case 'BAD':
        return 'danger';
      case 'CRITICAL':
        return 'contrast';
      default:
        return 'success'; // Handle unexpected values
    }
  }

  isAssigned(status: boolean){
    switch (status){
      case false:
          return 'danger';
      case true:
          return 'success';
    }
  }

  fetchPatients(): void {
    this.patientsService.getPatients()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
      next: (data) => {
        this.patients = data; // Store the received patient list
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching patients:', err);
        this.isLoading = false;
      }
    });
  }
}

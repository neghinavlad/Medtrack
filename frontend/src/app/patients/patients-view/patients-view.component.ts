import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {Patient} from '../patients.model';
import {PatientsService} from '../patients.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-patients-view',
  standalone: true,
  templateUrl: './patients-view.component.html',
  imports: [
    TableModule
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

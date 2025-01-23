import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Patient } from '../patients/patients.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientsService } from '../patients/patients.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  newPatient: Patient;
  patientForm!: FormGroup;

  private destroyRef = inject(DestroyRef);

  constructor(private formBuilder: FormBuilder, private patientsService: PatientsService) {
    this.newPatient = new Patient({})
  }

  ngOnInit() {
    this.initFormPatient();
  }

  private initFormPatient(): void {
    this.patientForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      age: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      condition: ['', Validators.required], // Should match enum values
      date_of_arrival: [new Date().toISOString(), Validators.required], // Default to now
      medical_record: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      console.log('Submitting patient:', this.patientForm.value);
      this.addPatient(this.patientForm.value);
      this.patientForm.reset(); // Reset form after successful submission
    } else {
      console.log('Form is invalid, please correct the errors.');
      this.patientForm.markAllAsTouched(); // Highlights invalid fields
    }
  }

  private addPatient(params: any): void {
    this.patientsService
      .createPatient(params)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          console.log("Patient added successfully");
        },
        error: () => {
          console.log("Error trying to add patient");
        }
      });
  }
}

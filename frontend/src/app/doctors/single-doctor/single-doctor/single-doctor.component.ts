import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '../../doctors.model';
import { DoctorsService } from '../../doctors.service';
import { Patient } from '../../../patients/patients.model';
import { PatientsService } from '../../../patients/patients.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PickList } from 'primeng/picklist';


@Component({
  selector: 'app-single-doctor',
  standalone: true,
  templateUrl: './single-doctor.component.html',
  styleUrl: './single-doctor.component.scss',
  imports: [
    PickList
  ]
})
export class SingleDoctorComponent implements OnInit {
  doctor: Doctor | null = null;
  doctorId: number | null = null;
  assignedPatients: Patient[] = [];
  unassignedPatients: Patient[] = [];

  movedItems: any[] = [];

  private destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private doctorsService: DoctorsService,
    private patientsService: PatientsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.doctorId = Number(params.get('doctorId'));
      if (this.doctorId) {
        this.fetchDoctor(this.doctorId);
        this.fetchPatients();
      }
    });
  }

  private fetchPatients(): void {
    this.patientsService.getPatients()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (patients) => {
          if (this.doctorId) {
            this.assignedPatients = patients.filter(p => p.assignedDoctorId === this.doctorId);
            this.unassignedPatients = patients.filter(p => p.assignedDoctorId === null); // Only unassigned patients
          }
        },
        error: (err) => {
          console.error('Error fetching patients:', err);
        }
      });
  }

  private fetchDoctor(id: number): void {
    this.doctorsService.getDoctorById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (doctor) => {
          this.doctor = doctor;
        },
        error: (err) => {
          console.error('Error fetching doctor:', err);
        }
      });
  }

  assignPatients($event:any): void {
    this.movedItems = $event.items;
    console.log(this.movedItems);

    const updatedPatient = { ...this.movedItems[0], assignedDoctorId: this.doctorId, isAssigned: true };
    console.log(updatedPatient);

    this.patientsService.updatePatient(updatedPatient.id, updatedPatient)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          console.log("Patient assigned successfully");
        },
        error: () => {
          console.log("There has been an error")
        }
      })
  }

  unassignPatients($event: any): void {
    this.movedItems = $event.items;
    console.log(this.movedItems);

    const updatedPatient = { ...this.movedItems[0], assignedDoctorId: null, isAssigned: false };
    console.log(updatedPatient);

    this.patientsService.updatePatient(updatedPatient.id, updatedPatient)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          console.log("Patient assigned successfully");
        },
        error: () => {
          console.log("There has been an error")
        }
      })
  }

  private convertToFormData(patient: Patient): FormData {
    const formData = new FormData();
    Object.keys(patient).forEach(key => {
      const value = patient[key as keyof Patient];
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    return formData;
  }

}

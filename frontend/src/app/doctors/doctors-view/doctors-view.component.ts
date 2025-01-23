import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {Doctor} from '../doctors.model';
import {DoctorsService} from '../doctors.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TableModule} from 'primeng/table';
import {Router} from '@angular/router';

@Component({
  selector: 'app-doctors-view',
  standalone: true,
  templateUrl: './doctors-view.component.html',
  imports: [
    TableModule
  ],
  styleUrl: './doctors-view.component.scss'
})
export class DoctorsViewComponent implements OnInit{
  doctors: Doctor[] = [];
  isLoading = true;

  private destroyRef = inject(DestroyRef);
  private doctorsService = inject(DoctorsService);

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.fetchDoctors();
  }

  navigateToDoctor(doctorId: number): void {
    this.router.navigate(['/doctors', doctorId]);
  }
  fetchDoctors():void{
    this.doctorsService.getDoctors()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next : (data) => {
          this.doctors = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error', err);
          this.isLoading = false;
        }
      })
  }
}

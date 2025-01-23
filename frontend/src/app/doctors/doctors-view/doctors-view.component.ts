import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {Doctor} from '../doctors.model';
import {DoctorsService} from '../doctors.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-doctors-view',
  standalone: true,
  templateUrl: './doctors-view.component.html',
  styleUrl: './doctors-view.component.scss'
})
export class DoctorsViewComponent implements OnInit{
  doctors: Doctor[] = [];
  isLoading = true;

  private destroyRef = inject(DestroyRef);
  private doctorsService = inject(DoctorsService);

  ngOnInit() {
    this.fetchDoctors();
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

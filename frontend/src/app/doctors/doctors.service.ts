import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Doctor} from './doctors.model';
import {EndpointList} from '../endpoints';


@Injectable({
  providedIn: 'root',
})

export class DoctorsService{

  constructor(private http: HttpClient) {}


  getDoctors(): Observable<Doctor[]>{
    return  this.http.get<Doctor[]>(EndpointList.doctors());
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(EndpointList.doctors(id));
  }


  createDoctor(DoctorData: FormData): Observable<Doctor> {
    return this.http.post<Doctor>(EndpointList.doctors(), DoctorData);
  }

  updateDoctor(id: number, DoctorData: FormData): Observable<Doctor> {
    return this.http.put<Doctor>(EndpointList.doctors(id), DoctorData);
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(EndpointList.doctors(id));
  }
}

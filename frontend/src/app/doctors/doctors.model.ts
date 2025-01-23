export class Doctor{
  id: number;
  name: string;
  specialization: string;

  constructor(doctor:any) {
    this.id = doctor?.id || 0;
    this.name = doctor?.name || '';
    this.specialization = doctor?.specialization || '';
  }

}



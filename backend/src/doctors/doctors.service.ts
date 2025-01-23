import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DoctorsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createDoctorDto: Prisma.DoctorCreateInput) {
    return this.databaseService.doctor.create({ data: createDoctorDto });
  }

  async findAll() {
    return this.databaseService.doctor.findMany({});
  }

  async findOne(id: number) {
    return this.databaseService.doctor.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateDoctorDto: Prisma.DoctorUpdateInput) {
    return this.databaseService.doctor.update({
      where: {
        id,
      },
      data: updateDoctorDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.doctor.delete({
      where: { id },
    });
  }
}

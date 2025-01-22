import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [DatabaseModule, PatientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

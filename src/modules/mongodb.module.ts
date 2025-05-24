import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VehicleRepositoryImpl } from '@infrastructure/database/vehicle.repository.impl';
import { VehicleDocument, VehicleSchema } from '@shared/mongodb/vehicle.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    MongooseModule.forFeature([
      { name: VehicleDocument.name, schema: VehicleSchema },
    ]),
  ],
  providers: [VehicleRepositoryImpl],
  exports: [MongooseModule, VehicleRepositoryImpl],
})
export class MongodbModule {}

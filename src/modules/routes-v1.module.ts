import { Module } from '@nestjs/common';

import { HealthCheckModule } from './health-check/health-check.module';
import { VehicleModule } from './vehicle.module';

@Module({
  imports: [HealthCheckModule, VehicleModule],
})
export class RoutesV1Module {}

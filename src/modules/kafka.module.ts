import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PublisherPort } from '@application/ports/publisher.port';
import { VehiclePublisher } from '@infrastructure/messaging/publisher/vehicle.publisher';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PublisherPort,
      useClass: VehiclePublisher,
    },
  ],
  exports: [PublisherPort],
})
export class KafkaModule {}

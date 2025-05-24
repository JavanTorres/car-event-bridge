import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer, Partitioners } from 'kafkajs';

import { PublisherPort } from '@application/ports/publisher.port';
import { Vehicle } from '@domain/entities/vehicle.entity';

@Injectable()
export class VehiclePublisher
  extends PublisherPort<Vehicle>
  implements OnModuleInit
{
  private producer: Producer;

  constructor(private readonly config: ConfigService) {
    super();
  }

  async onModuleInit() {
    const brokersEnv = this.config.get<string>('KAFKA_BROKERS');
    const brokers = brokersEnv
      ? brokersEnv.split(',').map((b) => b.trim())
      : ['kafka:9092'];

    const kafka = new Kafka({
      clientId: 'nestjs-app',
      brokers,
    });

    this.producer = kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
    });

    await this.producer.connect();
  }

  async publish(action: string, vehicle: Vehicle): Promise<void> {
    const value = JSON.stringify({ action, payload: vehicle });
    await this.producer.send({
      topic: 'vehicle.log',
      messages: [{ key: vehicle.uuid, value }],
    });
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RoutesV1Module } from './modules/routes-v1.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RoutesV1Module],
})
export class AppModule {}

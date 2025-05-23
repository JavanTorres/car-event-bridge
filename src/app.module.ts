import { existsSync } from 'node:fs';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RoutesV1Module } from './modules/routes-v1.module';

const nodeEnv = process.env.NODE_ENV?.toLowerCase() || '';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${nodeEnv}`, '.env'].filter((path) =>
        existsSync(path),
      ),
    }),
    RoutesV1Module,
  ],
})
export class AppModule {}

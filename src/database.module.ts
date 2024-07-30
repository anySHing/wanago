import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'postgres',
        host: ConfigService.get('POSTGRES_HOST'),
        port: ConfigService.get('POSTGRES_PORT'),
        username: ConfigService.get('POSTGRES_USER'),
        password: ConfigService.get('POSTGRES_PASSWORD'),
        database: ConfigService.get('POSTGRES_DB'),
        entities: [__dirname + '/../**/*.entitiy.ts'],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}

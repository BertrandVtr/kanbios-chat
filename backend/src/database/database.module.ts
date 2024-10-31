import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { ConfigService } from '@nestjs/config';
import * as process from 'node:process';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_DB'),
        synchronize: process.env.NODE_ENV === 'development',
        autoLoadEntities: true,
        entities: [User],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

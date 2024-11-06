import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/user.entity';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';

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
        synchronize: true,
        entities: [User],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useFactory: (
        configService: ConfigService,
      ): MongooseModuleFactoryOptions => {
        const host = configService.get<string>('MONGO_DB_HOST');
        const port = configService.get<string>('MONGO_DB_PORT');
        const db = configService.get<string>('MONGO_DB_DATABASE');

        return {
          uri: `mongodb://${host}:${port}/${db}`,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

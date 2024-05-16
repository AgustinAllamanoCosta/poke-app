import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BasicConfig, basicConfigFactory } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthService } from './auth/auth.service';
import { AuthMiddleware } from './auth/guards/auth.guard';
import { PokeUser } from './auth/entity/pokeUser.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [basicConfigFactory],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: BasicConfig.database_host,
      port: BasicConfig.database_port,
      username: BasicConfig.database_username,
      password: BasicConfig.database_password,
      database: BasicConfig.database_name,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: [join(__dirname, '**', '/migrations/*.ts')],
      migrationsTableName: 'executed_migrations',
      synchronize: false,
    }),
    TypeOrmModule.forFeature([PokeUser]),
  ],
  controllers: [AppController],
  providers: [AuthService, AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/*');
  }
}

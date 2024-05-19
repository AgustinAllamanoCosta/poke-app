import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { basicConfigFactory } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './auth/guards/auth.guard';
import { databaseConfig } from '../data.source';
import { DataSourceOptions } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { BattleModule } from './battle/battle.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [basicConfigFactory],
    }),
    TypeOrmModule.forRoot(databaseConfig as DataSourceOptions),
    AuthModule,
    CardsModule,
    BattleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/*');
  }
}

import { join } from "path";
import { BasicConfig } from "./src/config/configuration";
import { DataSourceOptions } from "typeorm";

export const databaseConfig = {
      type: 'postgres',
      host: BasicConfig.database_host,
      port: BasicConfig.database_port,
      username: BasicConfig.database_username,
      password: BasicConfig.database_password,
      database: BasicConfig.database_name,
      entities: [join(__dirname, '**', '**/entity/*.entity.{ts,js}')],
      migrations: [join(__dirname, '**', '/migrations/*.ts')],
      migrationsTableName: 'executed_migrations',
      synchronize: false,
      migrationsRun: false,
} as DataSourceOptions;

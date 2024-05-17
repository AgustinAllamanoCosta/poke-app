import { join } from "path";
import { BasicConfig } from "./src/config/configuration";

export const databaseConfig = {
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
};

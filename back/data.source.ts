import { join } from "path";
import { BasicConfig } from "./src/config/configuration";
import { DataSourceOptions } from "typeorm";
import { PokeUser } from "./src/auth/entity/pokeUser.entity";
import { PokeCard } from "./src/cards/entity/Card.Entity";

export const databaseConfig = {
      type: 'postgres',
      host: BasicConfig.database_host,
      port: BasicConfig.database_port,
      username: BasicConfig.database_username,
      password: BasicConfig.database_password,
      database: BasicConfig.database_name,
      entities: [PokeUser,PokeCard],
      migrations: [join(__dirname, '**', '/migrations/*.ts')],
      migrationsTableName: 'executed_migrations',
      synchronize: true,
      migrationsRun: false,
      logging: true
} as DataSourceOptions;

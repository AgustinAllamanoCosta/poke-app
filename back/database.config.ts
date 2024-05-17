import { DataSource, DataSourceOptions } from 'typeorm';
import { databaseConfig } from './data.source';

export default new DataSource( { name: 'migrationConnection', ...databaseConfig } as DataSourceOptions );

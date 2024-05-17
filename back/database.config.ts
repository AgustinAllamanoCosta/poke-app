import { DataSource, DataSourceOptions } from 'typeorm';
import { databaseConfig } from './data.source';

export default new DataSource( databaseConfig as DataSourceOptions ).initialize();

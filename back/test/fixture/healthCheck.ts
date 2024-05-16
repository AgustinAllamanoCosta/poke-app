import { HealthCheckResponse } from 'src/types/healthCheck';

export const systemDate: Date = new Date('1995 02 10');

export const healthCheckResponse: HealthCheckResponse = {
  systemTime: systemDate.toISOString(),
};

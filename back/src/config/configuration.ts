export default ()=> ( {
  environment: process.env.environment ? process.env.environment : 'no-config-loaded',
});

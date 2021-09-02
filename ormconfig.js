const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['./dist/modules/**/entities/*.ts'],
  migrations: ['./dist/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './dist/shared/infra/typeorm/migrations',
  },
};

if (process.env.NODE_ENV !== 'production') {
  Object.assign(config, {
    entities: ['./src/modules/**/entities/*.ts'],
    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
    cli: {
      migrationsDir: './src/shared/infra/typeorm/migrations',
    },
  });
}

module.exports = config;

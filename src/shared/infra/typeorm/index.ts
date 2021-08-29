import { Connection, createConnection } from 'typeorm';

function createDatabaseConnetion(): Promise<Connection> {
  return createConnection();
}

export { createDatabaseConnetion };

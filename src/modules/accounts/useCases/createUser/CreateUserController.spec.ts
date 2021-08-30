import supertest from 'supertest';
import { Connection } from 'typeorm';

import { TypeormUsersRepository } from '@modules/accounts/infra/typeorm/repositories/TypeormUsersRepositories';
import { app } from '@shared/infra/http/app';
import { createDatabaseConnetion } from '@shared/infra/typeorm';

let connection: Connection;
let typeormUsersRepository: TypeormUsersRepository;

describe('CreateUserController', () => {
  beforeAll(async () => {
    connection = await createDatabaseConnetion();
  });

  beforeEach(async () => {
    await connection.runMigrations();

    typeormUsersRepository = new TypeormUsersRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  afterEach(async () => {
    await connection.dropDatabase();
  });

  it('should be able to create a new product', async () => {
    const { status, body } = await supertest(app).post('/users').send({
      name: 'Brendan Batz',
      email: 'Henry_Roob@hotmail.com',
      password: 'nf0BjIpLZA7ytoC',
    });

    expect(status).toEqual(201);
    expect(body).toMatchObject({
      id: expect.any(String),
      name: 'Brendan Batz',
      email: 'henry_roob@hotmail.com',
      password: expect.any(String),
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });
  });

  it('should not be able to create a new user with same email from another', async () => {
    await typeormUsersRepository.create({
      email: 'duplicate@email.com',
      name: 'Peggy Lubowitz',
      password: 'd_FzA9tjBnzgsWf',
    });

    const { status, body } = await supertest(app).post('/users').send({
      name: 'Brendan Batz',
      email: 'Duplicate@email.com',
      password: 'nf0BjIpLZA7ytoC',
    });
    expect(status).toEqual(400);
    expect(body).toEqual({
      error: 'User already exists',
      statusCode: 400,
    });
  });
});

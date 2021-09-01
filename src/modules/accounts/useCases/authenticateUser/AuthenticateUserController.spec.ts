import supertest from 'supertest';
import { Connection } from 'typeorm';

import { TypeormUsersRepository } from '@modules/accounts/infra/typeorm/repositories/TypeormUsersRepositories';
import { BCryptHashProvider } from '@shared/container/providers/HashProvider/implementations/BCryptHashProvider';
import { app } from '@shared/infra/http/app';
import { createDatabaseConnetion } from '@shared/infra/typeorm';

let connection: Connection;
let typeormUsersRepository: TypeormUsersRepository;
let bcryptHashProvider: BCryptHashProvider;

describe('AuthenticateUserController', () => {
  beforeAll(async () => {
    connection = await createDatabaseConnetion();
  });

  beforeEach(async () => {
    await connection.runMigrations();

    typeormUsersRepository = new TypeormUsersRepository();
    bcryptHashProvider = new BCryptHashProvider();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  afterEach(async () => {
    await connection.dropDatabase();
  });

  it('should be able to authenticate user', async () => {
    const passwordHashed = await bcryptHashProvider.genareteHash(
      'Z6U1mrLp14xqRSb',
    );

    await typeormUsersRepository.create({
      name: 'Rosa Abshire',
      email: 'marcelo_adams49@hotmail.com',
      password: passwordHashed,
    });

    const { status, body } = await supertest(app).post('/sessions').send({
      email: 'marcelo_adams49@hotmail.com',
      password: 'Z6U1mrLp14xqRSb',
    });

    expect(status).toEqual(200);
    expect(body).toMatchObject({
      user: {
        name: 'Rosa Abshire',
        email: 'marcelo_adams49@hotmail.com',
      },
      token: expect.any(String),
    });
  });

  it('should not be able to authenticate user', async () => {
    const passwordHashed = await bcryptHashProvider.genareteHash(
      '8tcqTkzAAtp2nfh',
    );

    await typeormUsersRepository.create({
      name: 'Rosa Abshire',
      email: 'layne.cummings9@example.net',
      password: passwordHashed,
    });

    const { status, body } = await supertest(app).post('/sessions').send({
      email: 'layne.cummings9@example.net',
      password: 'Z6U1mrLp14xqRSb',
    });

    expect(status).toEqual(400);
    expect(body).toMatchObject({
      error: 'Email or password incorrect',
      statusCode: 400,
    });
  });
});

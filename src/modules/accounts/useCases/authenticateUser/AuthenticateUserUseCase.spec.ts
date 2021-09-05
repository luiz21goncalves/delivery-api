import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryHashProvider } from '@shared/container/providers/HashProvider/in-memory/InMemoryHashProvider';

import { AuthenticateUserException } from './AuthenticateUserException';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryHashProvider: InMemoryHashProvider;

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryHashProvider = new InMemoryHashProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      inMemoryHashProvider,
    );
  });

  it('should be able to authenticate user', async () => {
    await inMemoryUsersRepository.create({
      name: 'Forrest Little II',
      email: 'clovis99@hotmail.com',
      password: 'DnsKBTHQg4khKaB',
    });

    const response = await authenticateUserUseCase.execute({
      email: 'clovis99@hotmail.com',
      password: 'DnsKBTHQg4khKaB',
    });

    expect(response).toMatchObject({
      user: {
        name: 'Forrest Little II',
        email: 'clovis99@hotmail.com',
      },
      token: expect.any(String),
    });
  });

  it('should not be able to authenticate without non existing user', async () => {
    await inMemoryUsersRepository.create({
      name: 'Mindy Sauer',
      email: 'litzy71@gmail.com',
      password: '4W1UFhPTRzTIHWP',
    });

    await expect(
      authenticateUserUseCase.execute({
        email: 'non_existing_user@email.com',
        password: '4W1UFhPTRzTIHWP',
      }),
    ).rejects.toEqual(new AuthenticateUserException());
  });

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryUsersRepository.create({
      name: 'Madeline Feil',
      email: 'darrion72@yahoo.com',
      password: 'tKgLhQ_jUJQR6Iw',
    });

    await expect(
      authenticateUserUseCase.execute({
        email: 'darrion72@yahoo.com',
        password: 'wrong-password',
      }),
    ).rejects.toEqual(new AuthenticateUserException());
  });
});

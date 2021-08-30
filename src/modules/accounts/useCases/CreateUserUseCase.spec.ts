import { InMemoryUsersRepository } from '../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Clarence Bechtelar',
      email: 'Austin3@gmail.com',
      password: 'nf0BjIpLZA7ytoC',
    });

    expect(user).toMatchObject({
      id: expect.any(String),
      name: 'Clarence Bechtelar',
      email: 'Austin3@gmail.com',
      password: 'nf0BjIpLZA7ytoC',
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('should not be able to create a new user with same email from another', async () => {
    await inMemoryUsersRepository.create({
      name: 'Jay Daniel',
      email: 'duplicate@email.com',
      password: 'URSDVevwP_pme_c',
    });

    await expect(
      createUserUseCase.execute({
        name: 'Freda Lueilwitz',
        email: 'duplicate@email.com',
        password: '359rSMFcx_hl997',
      }),
    ).rejects.toEqual(new Error('user already exists'));
  });
});

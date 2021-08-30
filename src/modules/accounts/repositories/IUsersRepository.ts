import { User } from '../infra/typeorm/entities/User';
import { ICreateUserDTO } from '../useCases/ICreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}

export { IUsersRepository };

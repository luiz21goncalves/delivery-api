import { User } from '../infra/typeorm/entities/User';
import { ICreateUserDTO } from '../useCases/ICreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
}

export { IUsersRepository };

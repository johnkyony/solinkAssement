import { Resolver, Query, Arg, Int , Mutation} from 'type-graphql';
import { User } from '../../entities/User';
import { getRepository } from 'typeorm';
import { CreateUserInput } from '../types/UserInput';


@Resolver()
export class UserResolver {
  @Query(() => User)
  async getUser(@Arg('id', () => Int) id:number) {
    const user = this.getUser(id)

    return user; // Return the fetched user
  }

  @Mutation(() => User)
  async createUser(@Arg('data') data: CreateUserInput): Promise<User>{
    const userRepository = getRepository(User);
    const user = userRepository.create(data)
    await userRepository.save(user)

    return user;

  }
}

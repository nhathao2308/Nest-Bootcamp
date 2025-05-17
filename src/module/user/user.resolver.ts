import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  users() {
    return this.userService.findAll();
  }

  @Query(() => User)
  user(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.userService.register(registerInput);
  }

  @Mutation(() => String)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.userService.login(loginInput);
  }
}

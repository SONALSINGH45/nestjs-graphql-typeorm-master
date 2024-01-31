
// import {
//   Resolver,
//   Query,
//   Args,
//   Int,
//   Mutation,
//   ResolveField,
//   Parent,
// } from '@nestjs/graphql';
// import { User } from "../entites/user.entity"
// //import { CreateUserInput } from '../graphql/utils/CreateUserInput';
// import { CreateUserInput, updateUserInput } from '../graphql/utils/CreateUserInput';
// import { UserService } from './UserService';
// import { UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from 'src/auth.guard';

// @Resolver((of) => User)
// //@UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to all methods in this resolver
// export class UserResolver {
//   constructor(private userService: UserService) { }

//   @Query((returns) => User, { nullable: true })
//   getUserById(@Args('id', { type: () => Int }) id: number) {
//     return this.userService.getUserById(id);
//   }

//   @Query(() => [User])
//   getUsers() {
//     return this.userService.getUsers();
//   }

//   @Mutation((returns) => User)
//   createUser(@Args('createUserData') createUserData: CreateUserInput) {
//     return this.userService.createUser(createUserData);
//   }
//   @Mutation((returns) => User)
//   updateUser(@Args('updateUserData') updateUserData: updateUserInput) {
//     return this.userService.updateUser(updateUserData);
//   }
// }
// src/user/user.resolver.ts

// user.resolver.ts

// import {
//   Resolver,
//   Query,
//   Args,
//   Int,
//   Mutation,
//   Subscription,
// } from '@nestjs/graphql';
// import { User } from "../entites/user.entity"
// import { CreateUserInput, updateUserInput } from '../graphql/utils/CreateUserInput';
// import { UserService } from './UserService';
// import { PubSub } from 'graphql-subscriptions';

// @Resolver((of) => User)
// export class UserResolver {
//   constructor(
//     private userService: UserService,
//     private pubSub: PubSub,
//   ) { }

//   @Query((returns) => User, { nullable: true })
//   getUserById(@Args('id', { type: () => Int }) id: number) {
//     return this.userService.getUserById(id);
//   }

//   @Query(() => [User])
//   getUsers() {
//     return this.userService.getUsers();
//   }

//   @Mutation((returns) => User)
//   createUser(@Args('createUserData') createUserData: CreateUserInput) {
//     const newUser = this.userService.createUser(createUserData);
//     this.pubSub.publish('userCreated', { userCreated: newUser });
//     return newUser;
//   }

//   @Mutation((returns) => User)
//   updateUser(@Args('updateUserData') updateUserData: updateUserInput) {
//     const updatedUser = this.userService.updateUser(updateUserData);
//     this.pubSub.publish('userUpdated', { userUpdated: updatedUser });
//     return updatedUser;
//   }

//   @Subscription((returns) => User, {
//     name: 'userCreated',
//   })
//   userCreated(@Args('createUserData') createUserData: CreateUserInput) {
//     return this.pubSub.asyncIterator('userCreated');
//   }

//   @Subscription((returns) => User, {
//     name: 'userUpdated',
//   })
//   userUpdated(@Args('updateUserData') updateUserData: updateUserInput) {
//     return this.pubSub.asyncIterator('userUpdated');
//   }
// }


import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  Subscription,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import { User } from "../entites/user.entity"
import { CreateUserInput, updateUserInput } from '../graphql/utils/CreateUserInput';
import { UserService } from './UserService';
import { PubSub } from 'graphql-subscriptions';


@ObjectType()
class UserQueryMetadata {
  @Field(() => Int)
  total_records: number;

  @Field(() => Int)
  pageNumber: number;

  @Field(() => Int)
  pageSize: number;
}
@ObjectType() // Add this decorator to define a GraphQL object type

class UserQueryResult {
  @Field(() => [User])
  users: User[];

  @Field(() => UserQueryMetadata)
  metadata: UserQueryMetadata;
}
@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private pubSub: PubSub,
  ) { }

  @Query((returns) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }

  // @Query(() => [User])
  // getUsers(
  //   @Args('pageNumber', { type: () => Int, nullable: true }) pageNumber: number,
  //   @Args('pageSize', { type: () => Int, nullable: true }) pageSize: number,
  // ) {
  //   return this.userService.getUsers(pageNumber, pageSize);
  // }
  // getUsers(
  //   @Args('pageNumber', { type: () => Int, nullable: true }) pageNumber: number,
  //   @Args('pageSize', { type: () => Int, nullable: true }) pageSize: number,
  // ) {
  //   return this.userService.getUsers(pageNumber, pageSize);
  // }
  @Query(() => UserQueryResult)
  getUsers(
    @Args('pageNumber', { type: () => Int, nullable: true }) pageNumber?: number,
    @Args('pageSize', { type: () => Int, nullable: true }) pageSize?: number,
  ) {
    const users = this.userService.getUsers(pageNumber, pageSize);
    const total_records = this.userService.getTotalUserCount(); // Implement this method in your service

    return { users, metadata: { total_records, pageNumber, pageSize } };
  }

  @Mutation((returns) => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput) {
    const newUser = this.userService.createUser(createUserData);
    this.pubSub.publish('userCreated', { userCreated: newUser });
    return newUser;
  }

  @Mutation((returns) => User)
  updateUser(@Args('updateUserData') updateUserData: updateUserInput) {
    const updatedUser = this.userService.updateUser(updateUserData);
    this.pubSub.publish('userUpdated', { userUpdated: updatedUser });
    return updatedUser;
  }

  @Subscription((returns) => User, {
    name: 'userCreated',
  })
  userCreated(@Args('createUserData') createUserData: CreateUserInput) {
    return this.pubSub.asyncIterator('userCreated');
  }

  @Subscription((returns) => User, {
    name: 'userUpdated',
  })
  userUpdated(@Args('updateUserData') updateUserData: updateUserInput) {
    return this.pubSub.asyncIterator('userUpdated');
  }
}

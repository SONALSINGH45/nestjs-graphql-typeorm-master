// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { FindOneOptions, Repository } from 'typeorm';
// import { User } from "../entites/user.entity"
// import { CreateUserInput, updateUserInput } from '../graphql/utils/CreateUserInput';

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectRepository(User) private usersRepository: Repository<User>,
//   ) { }

//   getUsers() {
//     return this.usersRepository.find({ relations: ['settings'] });
//   }

//   getUserById(id: number) {
//     return this.usersRepository.findOne({
//       where: { id },
//       relations: ['settings'],
//     });
//   }

//   createUser(createUserData: CreateUserInput) {
//     const newUser = this.usersRepository.create(createUserData);
//     return this.usersRepository.save(newUser);
//   }
//   // updateUser(updateUserData: updateUserInput) {
//   //   const newUser = this.usersRepository.update({ id: updateUserData.id }, updateUserData);
//   //   return this.usersRepository.save(newUser);
//   // }
//   // async updateUser(updateUserData: updateUserInput) {
//   //   // Perform the update
//   //   const updateResult = await this.usersRepository.update({ id: updateUserData.id }, updateUserData);
//   //   const updatedUser = await this.usersRepository.findOne({ id: updateUserData.id } as FindOneOptions<User>);

//   //   // Check if the update was successful
//   //   if (updateResult.affected === 1) {
//   //     // Retrieve the updated user by primary key
//   //     //const updatedUser = await this.usersRepository.findOne(updateUserData.id);
//   //     const updatedUser = await this.usersRepository.findOne({ id: updateUserData.id } as FindOneOptions<User>);

//   //     // Return the updated user
//   //     return updatedUser;
//   //   } else {
//   //     // Handle the case where the user was not found or the update failed
//   //     throw new Error('User not found or update failed');
//   //   }
//   // }
//   async updateUser(updateUserData: updateUserInput) {
//     // Perform the update
//     const updateResult = await this.usersRepository.update({ id: updateUserData.id }, updateUserData);

//     // Check if the update was successful
//     if (updateResult.affected === 1) {
//       // Retrieve the updated user by primary key
//       const updatedUser = await this.usersRepository.findOne({
//         where: { id: updateUserData.id },
//       });

//       // Return the updated user
//       return updatedUser;
//     } else {
//       // Handle the case where the user was not found or the update failed
//       throw new Error('User not found or update failed');
//     }
//   }


// }
// src/user/user.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from "../entites/user.entity"
import { CreateUserInput, updateUserInput } from "../graphql/utils/CreateUserInput"

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  // getUsers() {
  //   return this.usersRepository.find({ relations: ['settings'] });
  // }
  // getUsers(pageNumber: number = 1, pageSize: number = 10): User[] {
  //   const startIndex = (pageNumber - 1) * pageSize;
  //   const endIndex = startIndex + pageSize;
  //   return this.users.slice(startIndex, endIndex);
  // }
  // async getUsers(pageNumber: number = 1, pageSize: number = 50): Promise<User[]> {
  //   const skip = (pageNumber - 1) * pageSize;
  //   return this.usersRepository.find({
  //     relations: ['settings'],
  //     skip,
  //     take: pageSize,
  //   });
  // }
  async getUsers(pageNumber: number = 1, pageSize: number = 50): Promise<User[]> {
    const skip = (pageNumber - 1) * pageSize;
    return this.usersRepository.find({
      relations: ['settings'],
      skip,
      take: pageSize,
    });
  }
  async getTotalUserCount(): Promise<number> {
    return this.usersRepository.count();
  }
  getUserById(id: number) {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['settings'],
    });
  }

  createUser(createUserData: CreateUserInput) {
    const newUser = this.usersRepository.create(createUserData);
    return this.usersRepository.save(newUser);
  }

  async updateUser(updateUserData: updateUserInput) {
    const updateResult = await this.usersRepository.update({ id: updateUserData.id }, updateUserData);

    if (updateResult.affected === 1) {
      const updatedUser = await this.usersRepository.findOne({
        where: { id: updateUserData.id },
      });

      return updatedUser;
    } else {
      throw new Error('User not found or update failed');
    }
  }
  // async onEvent(eventName: string, payload: any) {
  //   return this.pubSub.publish(eventName, payload);
  // }

}






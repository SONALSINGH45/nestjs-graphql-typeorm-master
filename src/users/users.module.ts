// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserResolver } from './UserResolver';
// import { UserService } from './UserService';
// import { User } from "../entites/user.entity"
// import { UserSettingService } from './UserSettingService';
// import { UserSetting } from "../entites/userSetting.entity"
// import { UserSettingsResolver } from '../graphql/resolvers/UserSettingsResolver';

// @Module({
//   imports: [TypeOrmModule.forFeature([User, UserSetting])],
//   providers: [
//     UserResolver,
//     UserService,
//     UserSettingService,
//     UserSettingsResolver,
//   ],
// })
// export class UsersModule { }
// users/users.module.ts
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserResolver } from './UserResolver';
// import { UserService } from './UserService';
// import { User } from "../entites/user.entity"
// import { UserSettingService } from './UserSettingService';
// import { UserSetting } from "../entites/userSetting.entity"
// import { UserSettingsResolver } from '../graphql/resolvers/UserSettingsResolver';

// @Module({
//   imports: [TypeOrmModule.forFeature([User, UserSetting])],
//   providers: [
//     UserResolver,
//     UserService,
//     UserSettingService,
//     UserSettingsResolver,
//   ],
// })
// export class UsersModule { }

// users / users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './UserResolver';
import { UserService } from './UserService';
import { UserSettingService } from './UserSettingService';
import { UserSettingsResolver } from '../graphql/resolvers/UserSettingsResolver';
import { User } from '../entites/user.entity';
import { UserSetting } from '../entites/userSetting.entity';
import { CacheService } from "../services/cache.service"
import { UserWebSocketGateway } from "../users/userwebsocket";  // Import UserWebSocketGateway
import { PubSub } from 'graphql-subscriptions';


@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting])],
  providers: [
    UserResolver,
    UserService,
    UserSettingService,
    UserSettingsResolver,
    CacheService,
    UserWebSocketGateway,
    PubSub,
    //  { provide: 'PUB_SUB', useValue: new PubSub() },

  ],
})
export class UsersModule { }
// users/users.module.ts
// users/users.module.ts
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserResolver } from './UserResolver';
// import { UserService } from './UserService';
// import { User } from '../entites/user.entity';
// import { UserSettingService } from './UserSettingService';
// import { UserSetting } from '../entites/userSetting.entity';
// import { UserSettingsResolver } from '../graphql/resolvers/UserSettingsResolver';

// @Module({
//   imports: [TypeOrmModule.forFeature([User, UserSetting])], // Include the necessary entities
//   providers: [
//     UserResolver,
//     UserService,
//     UserSettingService,
//     UserSettingsResolver,
//   ],
// })
// export class UsersModule { }

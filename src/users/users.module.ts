
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


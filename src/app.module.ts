// import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
// import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// import { GraphQLModule } from '@nestjs/graphql';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserSettingsResolver } from './graphql/resolvers/UserSettingsResolver';
// import { UsersModule } from './users/users.module';
// import { mock } from "./entites/mock.entity"
// import { JwtModule } from '@nestjs/jwt';
// import { JwtService } from '@nestjs/jwt';

// import { JwtStrategy } from "./jwt.strategy"
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { AuthService } from "./services/auth.service"
// import { CacheService } from "./services/cache.service"

// import { AuthController } from "./controllers/aut.contoller"
// import { PassportModule } from '@nestjs/passport';
// import { AuthModule } from './auth/auth.module';
// import { JwtMiddleware } from './middlewere/jwt.middlewere';
// import { UserService } from './users/UserService';
// import { PubSub } from 'graphql-subscriptions'; // Add this import



// @Module({
//   imports: [

//     GraphQLModule.forRoot<ApolloDriverConfig>({
//       driver: ApolloDriver,
//       autoSchemaFile: 'src/schema.gql',
//       installSubscriptionHandlers: true
//     }),
//     // GraphQLModule.forRoot<ApolloDriverConfig>({
//     //   driver: ApolloDriver,
//     //   autoSchemaFile: 'src/schema.gql',
//     //   installSubscriptionHandlers: true,
//     //   cors: {
//     //     origin: 'http://localhost:3000', // Replace with your React app's origin
//     //     credentials: true,
//     //   },
//     // }),
//     ConfigModule.forRoot(),
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//     JwtModule.register({
//       secret: 'your-secret-key', // Replace with your actual secret key
//       signOptions: { expiresIn: '1h' },
//     }),
//     TypeOrmModule.forRoot({
//       type: 'mysql',
//       host: 'localhost',
//       port: 3306,
//       username: 'root',
//       password: 'root',
//       database: 'test',
//       autoLoadEntities: true,
//       entities: [__dirname + '/**/entites/*.entity{.ts,.js}'],
//       synchronize: true,
//       logging: false,
//     }),
//     UsersModule,
//   ],
//   controllers: [AuthController],
//   providers: [JwtStrategy, AuthService, PubSub],
//   exports: [PassportModule],

// })
// //export class AppModule { }
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(JwtMiddleware).forRoutes('*');
//   }
// }
// ...

import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from "./controllers/aut.contoller"

import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './services/auth.service';
import { CacheService } from './services/cache.service';
import { JwtMiddleware } from "./middlewere/jwt.middlewere"

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      //context: ({ req, res }) => ({ req, res }),
      installSubscriptionHandlers: true,
      autoSchemaFile: 'src/schema.gql',
    }),
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'GQL', // Replace with your actual secret key
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      autoLoadEntities: true,
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, CacheService],
  exports: [PassportModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(JwtMiddleware).forRoutes('*');
  }

}

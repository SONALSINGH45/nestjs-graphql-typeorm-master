
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
import { Constants } from './utils/constant';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'src/schema.gql',
    }),
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: Constants.secret_key,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: Constants.HOST,
      port: 3306,
      username: Constants.USERNAME,
      password: Constants.PASSWORD,
      database: Constants.DATABASE,
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

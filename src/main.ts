import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';

import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './auth.guard';
import { ValidationPipe } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());
  const app2 = await NestFactory.create(AppModule);
  app.enableCors();


  app.useGlobalPipes(new ValidationPipe());
  // Initialize Passport
  app2.useGlobalGuards(new JwtAuthGuard());
  await app.listen(4000);
}
bootstrap();
//main.ts

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { WebSocketAdapter, NestExpressApplication } from '@nestjs/platform-express';
// import { GraphQLModule } from '@nestjs/graphql';
// import { PubSub } from 'graphql-subscriptions';
// import { JwtAuthGuard } from './auth.guard';

// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);
//   const app2 = await NestFactory.create(AppModule);

//   const pubSub = new PubSub();
//   const schema = await GraphQLModule.createSchema({
//     autoSchemaFile: true,
//     context: ({ req, res }) => ({ req, res }),
//   });

//   app.useWebSocketAdapter(new WebSocketAdapter(app, schema, pubSub));

//   app.useGlobalPipes(new ValidationPipe());
//   app2.useGlobalGuards(new JwtAuthGuard());


//   await app.listen(4000);
// }
// bootstrap();
// main.ts

// main.ts

// main.ts

// main.ts





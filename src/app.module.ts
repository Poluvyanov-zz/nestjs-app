import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import connectionOptions from '../ormconfig';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CommonModule } from './common/common.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotesModule } from './modules/notes/notes.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    UsersModule,
    NotesModule,
    TypeOrmModule.forRoot(connectionOptions),
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      path: '/graphql',
    }),
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

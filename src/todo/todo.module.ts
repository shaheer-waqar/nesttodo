import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { User } from 'src/user/entity/user.entity';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { LoginAttempt } from 'src/auth/entity/login-attempt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo,User,LoginAttempt])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}

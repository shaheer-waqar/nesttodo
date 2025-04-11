import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo,User])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { paramIdDto } from 'src/user/dto/paramId.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createTodoDto: CreateTodoDto) {
    const { title, task, user_id } = createTodoDto;

    const user = await this.userRepository.findOne({
      where: { id: user_id, deleted_at: IsNull() },
    });

    if (!user) throw new NotFoundException('user not found');
    const todo = await this.todoRepository.create({
      title: title,
      task: task,
      user: user,
    });

    await todo.save();

    return todo;
  }

  async findAll({id: userId}:paramIdDto){
    const todo = await this.todoRepository.find({
        where: {
            user: {
                id: userId,
                deleted_at: IsNull()
            }
        },
        relations: {
            user: true
        }
    })
  }
}

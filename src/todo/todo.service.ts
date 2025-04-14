import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { paramIdDto } from 'src/user/dto/paramId.dto';
import { UserIdDto } from 'src/user/dto/userId.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

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

  async findAll({ userId }: UserIdDto) {
    const todo = await this.todoRepository.find({
      where: {
        user: {
          id: userId,
          deleted_at: IsNull(),
        },
      },
      // relations:{
      //   user:true
      // }
    });
    return todo;
  }

  async findOne({ userId }: UserIdDto, { id }: paramIdDto) {
    const todo = await this.todoRepository.findOne({
      where: {
        id,
        deleted_at: IsNull(),
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
      },
    });

    if (!todo) throw new NotFoundException('user not found');

    return todo;
  }

  async update(
    updateTodoDto: UpdateTodoDto,
    { userId }: UserIdDto,
    { id }: paramIdDto,
  ) {
    const todo = await this.todoRepository.findOne({
      where: {
        id,
        deleted_at: IsNull(),
        user: {
          id: userId,
        },
      },
    });

    if (!todo) throw new NotFoundException('User not found');

    const update = await this.todoRepository.update(id, updateTodoDto);

    return update;
  }

  async delete({ userId }: UserIdDto, { id }: paramIdDto) {
    const todo = await this.todoRepository.findOne({
      where: {
        id: id,
        deleted_at: IsNull(),
        user: {
          id: userId,
        },
      },
    });

    if (!todo) throw new NotFoundException('User not found');

    todo.deleted_at = new Date();
    await todo.save();
    return todo;
  }
}

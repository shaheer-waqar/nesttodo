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
  async create(createTodoDto: CreateTodoDto ,currentUser : User) {
    const { title, task,} = createTodoDto;

    console.log(currentUser.id)
    const user = await this.userRepository.findOne({
      where: { id: currentUser.id, deleted_at: IsNull() },
    });

    console.log(user?.id)

    if (!user) throw new NotFoundException('user not found');
    const todo = await this.todoRepository.create({
      title: title,
      task: task,
      user: user,
    });

    await todo.save();

    return todo;
  }

  async findAll(currentUser: User) {
    const todo = await this.todoRepository.find({
      where: {
        user: {
          id: currentUser.id,
          deleted_at: IsNull(),
        },
      },
      // relations:{
      //   user:true
      // }
    });
    return todo;
  }

  async findOne(currentUser: User, { id }: paramIdDto) {
    const todo = await this.todoRepository.findOne({
      where: {
        id,
        deleted_at: IsNull(),
        user: {
          id: currentUser.id,
        },
      },
      relations: {
        user: true,
      },
    });

    if (!todo) throw new NotFoundException('Todo not found');

    return todo;
  }

  async update(
    updateTodoDto: UpdateTodoDto,
    currentUser: User,
    { id }: paramIdDto,
  ) {
    const todo = await this.todoRepository.findOne({
      where: {
        id,
        deleted_at: IsNull(),
        user: {
          id: currentUser.id,
        },
      },
    });

    if (!todo) throw new NotFoundException('User not found');

    const update = await this.todoRepository.update(id, updateTodoDto);

    return update;
  }

  async delete({ id }: paramIdDto ,currentUser:User) {
    const todo = await this.todoRepository.findOne({
      where: {
        id: id,
        deleted_at: IsNull(),
        user: {
          id: currentUser.id,
        },
      },
    });

    if (!todo) throw new NotFoundException('User not found');

    todo.deleted_at = new Date();
    await todo.save();
    return todo;
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    const response = await this.todoService.create(createTodoDto);

    return response;
  }

  @Get()
  async findAll() {}
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { paramIdDto } from 'src/user/dto/paramId.dto';
import { UserIdDto } from 'src/user/dto/userId.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    const response = await this.todoService.create(createTodoDto);

    return response;
  }

  @Get('get-all/:userId')
  async findAll(@Param() userId: UserIdDto) {
    const response = await this.todoService.findAll(userId);

    return response;
  }
  @Get('get-one/:id/:userId')
  async findONe(@Param() id: paramIdDto, @Param() userId: UserIdDto) {
    const response = await this.todoService.findOne(userId, id);

    return response;
  }

  @Patch('update/:userId/:id')
  async update(
    @Body() updateTodoDto: UpdateTodoDto,
    @Param() id: paramIdDto,
    @Param() userId: UserIdDto,
  ) {
    const response = await this.todoService.update(updateTodoDto, userId, id);

    return 'Your todo is updated successfully';
  }

  @Delete('delete/:userId/:id')
  async delete(@Param() id: paramIdDto, @Param() userId: UserIdDto) {
    const response = await this.todoService.delete(userId, id);

    return 'Your todo is  deleted successfully ';
  }
}

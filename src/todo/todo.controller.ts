import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { paramIdDto } from 'src/user/dto/paramId.dto';
import { UserIdDto } from 'src/user/dto/userId.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthJwtGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/entity/user.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseGuards(AuthJwtGuard)
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @CurrentUser() currentUser: User,
  ) {
    const response = await this.todoService.create(createTodoDto, currentUser);

    return response;
  }

  @Get('get-all')
  @UseGuards(AuthJwtGuard)
  async findAll(@CurrentUser() currentUser: User) {
    const response = await this.todoService.findAll(currentUser);

    return response;
  }
  @Get('get-one/:id')
  @UseGuards(AuthJwtGuard)
  async findONe(@Param() id: paramIdDto, @CurrentUser() currentUser: User) {
    const response = await this.todoService.findOne(currentUser, id);

    return response;
  }

  @Patch('update/:id')
  @UseGuards(AuthJwtGuard)
  async update(
    @Body() updateTodoDto: UpdateTodoDto,
    @Param() id: paramIdDto,
    @CurrentUser() currentUser: User,
  ) {
    const response = await this.todoService.update(
      updateTodoDto,
      currentUser,
      id,
    );

    return 'Your todo is updated successfully';
  }

  @Delete('delete/:id')
  @UseGuards(AuthJwtGuard)
  async delete(@Param() id: paramIdDto, @CurrentUser() currentUser: User) {
    const response = await this.todoService.delete(id,currentUser);

    return 'Your todo is  deleted successfully ';
  }
}

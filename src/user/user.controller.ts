import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { paramIdDto } from './dto/paramId.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() userCreateDto: UserCreateDto) {
    const response = await this.userService.create(userCreateDto);

    return response;
  }

  @Get()
  async findAll() {
    const response = await this.userService.findAll();

    return response;
  }
  @Get(':id')
  async findOne(@Param() id: paramIdDto) {
    const response = await this.userService.findOne(id);
    return response;
  }

  @Patch(':id')
  async update(@Param() id: paramIdDto, @Body() userUpdateDto: UserUpdateDto) {
    const response = await this.userService.update(id, userUpdateDto);
    return response;
  }

  @Delete(':id')
  async delete(@Param() id: paramIdDto) {
    const response = await this.userService.delete(id);

    return response;
  }
}

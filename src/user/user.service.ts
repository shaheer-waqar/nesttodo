import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { error } from 'console';
import * as bcrypt from 'bcryptjs';
import { paramIdDto } from './dto/paramId.dto';
import { UserUpdateDto } from './dto/user-update.dto';
@Injectable()
export class UserService {

  public users = [{
    email:"shaher@gmail.com",
    password:"hello"
  }]

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(userCreateDto: UserCreateDto) {
    const { email, password } = userCreateDto;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException({
        error: 'User already exist with this email',
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    userCreateDto.password = hashedPassword;

    const user = this.userRepository.create({
      ...userCreateDto,
    });

    await user.save();
    return user;
  }

  async getUser(email: string) {
    const user = await this.userRepository.findOne({
      where: { email},
    });
    
    console.log(user)
    return user;
  }
  // return this.users.find((user)=> user.email = email)

  async findAll() {
    const query = await this.userRepository.find({
      where: { deleted_at: IsNull() },
    });
    return query;
  }

  async findOne({ id }: paramIdDto) {
    const query = await this.userRepository.findOne({
      where: { id: id, deleted_at: IsNull() },
    });

    if (!query) throw new NotFoundException('user not found');

    return query;
  }

  async update({ id }: paramIdDto, userUpdateDto: UserUpdateDto) {
    const user = await this.userRepository.findOne({
      where: { id: id, deleted_at: IsNull() },
    });

    if (!user) throw new NotFoundException('user not found');

    const updated = await this.userRepository.update(id, userUpdateDto);

    return updated;
  }

  async delete({ id }: paramIdDto) {
    const user = await this.userRepository.findOne({
      where: { id, deleted_at: IsNull() },
    });

    if (!user) throw new NotFoundException('user not found');

    user.deleted_at = new Date();
    await user.save();
  }
}

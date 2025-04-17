import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // async generateToken (payload:User , ) :string{
  //     return this.jwtService.sign(payload)
  // }
  async login(payload: User) {
    const token = this.jwtService.sign({ payload });
    // console.log(req.user)

    return { token };
  }
}

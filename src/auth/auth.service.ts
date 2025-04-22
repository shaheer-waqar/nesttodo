import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from 'src/user/entity/user.entity';
import { LoginAttemptService } from './login-attempt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly loginAttemptService:LoginAttemptService,

  ) {}

  // async generateToken (payload:User , ) :string{
  //     return this.jwtService.sign(payload)
  // }
  async login(user:User, req:Request) {
    const token = this.jwtService.sign({ user });
    // console.log(req.user)
    
    await this.loginAttemptService.createLoginAttempt(req ,user,token)

    return { token };


  }
}

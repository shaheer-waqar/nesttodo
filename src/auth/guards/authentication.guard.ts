import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { IsNull, MoreThan, Repository } from 'typeorm';
import { LoginAttempt } from '../entity/login-attempt.entity';
import { User } from 'src/user/entity/user.entity';
  
@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    @InjectRepository(LoginAttempt)
    private loginAttemptRepository: Repository<LoginAttempt>,
  
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractTokenFormHeader(request);
     console.log("🚀 ~ AuthenticationGuard ~ canActivate ~ accessToken:", accessToken)
  
  
    const loginAttempt = await this.loginAttemptRepository.findOne({
      where: {
        access_token: accessToken,
        logout_at:IsNull()
      },
      relations: {
        user: true,
      },
    });
  
    // console.log(loginAttempt);
    if (!loginAttempt) {
      throw new UnauthorizedException('please login again');
    }
  
    const user = await this.userRepository.findOne({
      where: {
        id: loginAttempt.user.id,
        login_attempt: IsNull(),
  
      },
    });
  
    if (!user) {
      throw new UnauthorizedException('Session expired');
    }
    request['user'] = user;
    request['loginAttempt'] = loginAttempt;
  
    return true;
  }
  
  private extractTokenFormHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
  
    return type === 'Bearer' ? token : undefined;
  }
} 
  
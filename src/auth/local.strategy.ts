import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PassLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
        usernameField:'email',
        passwordField:'ignore'
    });
  }

  async validate(email: string) {
    const user = await this.userService.getUser(email);
    console.log(email);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}

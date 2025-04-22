import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class PassLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'email',
    });
    console.log('intialize')
  }

  async validate(email: string, password: string) {
    console.log('sf')
    const user = await this.userService.getUser(email);

    if (!user) throw new UnauthorizedException();

    const comparePass = await bcrypt.compare(password, user.password);

     if (!comparePass) throw new UnauthorizedException('wrong password');

    return user;
  }
}

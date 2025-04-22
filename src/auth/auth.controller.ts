import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthJwtGuard } from './auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() request:any) {
    const user = this.authService.login(request.user, request);
    return user;
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('check')
  check(@CurrentUser() currentUser: any) {
    console.log('current User', currentUser);
    return currentUser;
  }
}

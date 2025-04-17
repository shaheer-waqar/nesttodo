import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthJwtGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req: any) {
    const user = this.authService.login(req.user);
    return  user;
  }
  @UseGuards(AuthJwtGuard)
  @Get('check')
  check(@CurrentUser() currentUser:any) {
    console.log('current User' , currentUser )
    return currentUser;
  }
}

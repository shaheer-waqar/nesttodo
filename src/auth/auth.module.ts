import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassLocalStrategy } from './local.strategy';

@Module({
  imports: [UserModule,PassportModule],
  controllers: [AuthController],
  providers: [PassLocalStrategy],
})
export class AuthModule {}

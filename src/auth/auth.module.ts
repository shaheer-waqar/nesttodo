import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassLocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEntity } from './entity/request.entity';
import { LoginAttemptService } from './login-attempt.service';
import { LoginAttempt } from './entity/login-attempt.entity';
import { AuthJwtGuard } from './auth.guard';
import { User } from 'src/user/entity/user.entity';
import { AuthenticationGuard } from './guards/authentication.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestEntity,User,LoginAttempt]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'shaheerkey',
    }),
  ],
  controllers: [AuthController],
  providers: [
    PassLocalStrategy,
    AuthService,
    // JwtStrategy,
    LoginAttemptService,
    AuthenticationGuard,
  ],
  exports: [AuthenticationGuard],
})
export class AuthModule {}

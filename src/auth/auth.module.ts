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

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestEntity]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'shaheerkey',
    }),
  ],
  controllers: [AuthController],
  providers: [PassLocalStrategy, AuthService, JwtStrategy],
})
export class AuthModule {}

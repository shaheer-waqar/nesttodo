import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddle } from './middleware/logger.middleware';
import { AuthController } from './auth/auth.controller';
import { RequestEntity } from './auth/entity/request.entity';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AllResponse } from './interceptors/all-response.interceptor';
import { LoginAttempt } from './auth/entity/login-attempt.entity';
import { User } from './user/entity/user.entity';
import { AuthenticationGuard } from './auth/guards/authentication.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'shaheer',
      database: 'usercrud',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    TodoModule,
    AuthModule,
    TypeOrmModule.forFeature([RequestEntity,LoginAttempt,User,]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AllResponse,
    },
    // {
    //   provide:APP_GUARD,
    //   useClass:AuthenticationGuard
    // }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddle).forRoutes('*');
  }
}

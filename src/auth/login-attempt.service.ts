import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginAttempt } from './entity/login-attempt.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { UAParser } from 'ua-parser-js';
import { getClientIp } from 'request-ip';
import * as dayjs from 'dayjs';
import { Request } from 'express';

@Injectable()
export class LoginAttemptService {
  constructor(
    @InjectRepository(LoginAttempt)
    private loginAttemptRepository: Repository<LoginAttempt>,
  ) {}

  async createLoginAttempt(req: Request, user: User, accessToken: string) {
    const parser = new UAParser();
    const userAgentInfo = parser.setUA(req.headers['user-agent'] || '').getResult();

    const loginAttempt = await this.loginAttemptRepository.create({
      user: user,
      access_token: accessToken,
      ip_address: getClientIp(req),
      platform: userAgentInfo?.os?.name,
      user_agent: req?.headers['user-agent'],
      expire_at: dayjs().add(1, 'month').toDate(),
    });

    return await loginAttempt.save();
  }
}

import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { getClientIp } from 'request-ip';
import { RequestEntity } from 'src/auth/entity/request.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoggerMiddle implements NestMiddleware {
  constructor(
    @InjectRepository(RequestEntity)
    private RequestRepo: Repository<RequestEntity>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    // console.log('🚀 ~ LoggerMiddle ~ use ~ req:', req);

    const request = await this.RequestRepo.create({
      ip: getClientIp(req),
      method: req.method,
      path: req.baseUrl,
    });
    await request.save();
    next();
  }
}

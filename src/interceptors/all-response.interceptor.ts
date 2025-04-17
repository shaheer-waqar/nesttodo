import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';


@Injectable()
export class AllResponse implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const contextClass = context.getClass().name
        console.log("🚀 ~ AllResponse ~ contextClass:", contextClass)
    return next.handle().pipe(
        map(async(data)=>{
            console.log("🚀 ~ AllResponse ~ map ~ data:", data)
            return data
        })
    ); 
  }
}

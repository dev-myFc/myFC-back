import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('Http');
  use(request: Request, response: Response, next: NextFunction) {
    const { method, originalUrl } = request;
    response.on('finish', () => {
      const { statusCode, statusMessage } = response;
      this.logger.log(`Req -> ${method} ${originalUrl}`);
      this.logger.log(`Res -> ${statusCode} ${statusMessage}`);
    });
    next();
  }
}

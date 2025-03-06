import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class GrpcService {
  constructor(private readonly logger: PinoLogger) {}

  sendNotification(user: User): void {
    this.logger.info('Notification received for user:', user);
  }
}

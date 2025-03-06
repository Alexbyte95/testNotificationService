import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';

@Controller()
export class RabbitMQConsumer {
  constructor(private readonly logger: PinoLogger) {}

  @EventPattern('user.updated')
  handleUserUpdated(user: any) {
    this.logger.info({ user }, 'User updated');
  }
}

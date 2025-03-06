import { Body, Controller, Param, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post(':userId')
  async sendNotificationCustom(
    @Param('userId') userId: string,
    @Body() message: string,
  ): Promise<any> {
    const response = await this.notificationService.sendNotificationCustom(userId, message);
    return response;
  }

  @GrpcMethod('NotificationService', 'SendNotification')
  sendNotification(data: any): any {
    return this.notificationService.sendNotification(data);
  }
}

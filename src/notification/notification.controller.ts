import { Body, Controller, Param, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post(':userId')
  @ApiOperation({ summary: 'Send a custom notification to a user' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'The ID of the user to send the notification to',
  })
  @ApiBody({ description: 'Notification message', type: String })
  @ApiResponse({ status: 200, description: 'Notification sent successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async sendNotificationCustom(
    @Param('userId') userId: string,
    @Body() message: string,
  ): Promise<any> {
    const response = await this.notificationService.sendNotificationCustom(
      userId,
      message,
    );
    return response;
  }

  @GrpcMethod('NotificationService', 'SendNotification')
  @ApiOperation({ summary: 'Send a notification via gRPC' })
  sendNotification(data: any): any {
    return this.notificationService.sendNotification(data);
  }
}

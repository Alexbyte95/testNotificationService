import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { NotificationRepository } from './notification.repository';
import { Notification } from './notification.schema';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  private readonly userServiceUrl = 'http://localhost:3000/users';

  constructor(
    private readonly httpService: HttpService,
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async sendNotificationCustom(userId: string, message: any): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.userServiceUrl}/${userId}`),
      );

      const user = response.data;

      if (!user) {
        this.logger.warn(`User with ID ${userId} not found in Service A`);
        return { message: `User with ID ${userId} not found in Service A` };
      }
      this.logger.log(
        `📩 Notification sent to ${user.name} (${user.email}) (${message.message})`,
      );
      const notification = {
        userId,
        message: message.message,
      } as Notification;
      await this.notificationRepository.save(notification);

      this.logger.log(`Notification saved in DB for ${userId}`);
      return { message: `Notification processed for user ${userId}` };
    } catch (error) {
      this.logger.error(`Error ${error} `);
      return {
        message: `error : ${error.message} `,
      };
    }
  }

  sendNotification(data: any): any {
    this.logger.log(
      `Received notification request user new: ${data.name}, ${data.email}`,
    );
    return { success: true };
  }
}

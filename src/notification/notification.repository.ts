import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './notification.schema';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<Notification>,
  ) {}

  async save(notification: Notification): Promise<Notification> {
    const createdNotification = new this.notificationModel(notification);
    return createdNotification.save();
  }
}

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Notification extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  message: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

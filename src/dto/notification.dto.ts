import { ApiProperty } from '@nestjs/swagger';

export class SendNotificationDto {
  @ApiProperty({
    description: 'The ID of the user to whom the notification will be sent',
  })
  readonly userId: string;

  @ApiProperty({ description: 'The notification message' })
  readonly message: string;
}

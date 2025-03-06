import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './notification.repository';
import { Notification, NotificationSchema } from '../notification/notification.schema';
import { ClientsModule, GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { HttpModule } from '@nestjs/axios';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'notification',
          protoPath: join(process.cwd(), 'proto/notification.proto'),
          url: '0.0.0.0:50051',
          loader: { keepCase: true },
        },
      },
    ]),
    GrpcReflectionModule,
    HttpModule,
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    NotificationRepository,
    {
      provide: 'NOTIFICATION_SERVICE',
      useClass: NotificationService,
    },
  ],
  exports: [NotificationRepository, NotificationService],
})
export class NotificationModule {
  static grpcOptions: GrpcOptions = {
    transport: Transport.GRPC,
    options: {
      package: 'notification',
      protoPath: join(process.cwd(), 'proto/notification.proto'),
    },
  };
}

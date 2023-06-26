import { Module } from '@nestjs/common';
import { InfobiqService } from './infobiq.service';
import { InfobiqController } from './infobiq.controller';
import { HttpModule } from '@nestjs/axios';
import { InfobiqPushNotifcationService } from 'src/shared/service/Infobiq-push-notification.service';
import { LogUtilService } from 'src/shared/service/log-util.service';
import { InfobiqPeopleService } from 'src/shared/service/infobiq-people.service';

@Module({
  imports: [HttpModule.register({ timeout: 5000 })],
  controllers: [InfobiqController],
  providers: [
    InfobiqService,
    InfobiqPushNotifcationService,
    LogUtilService,
    InfobiqPeopleService,
  ],
})
export class InfobiqModule {}

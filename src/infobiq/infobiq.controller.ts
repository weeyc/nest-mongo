import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  HttpException,
} from '@nestjs/common';
import { InfobiqService } from './infobiq.service';
import { InfobiqPushNotifcationService } from 'src/shared/service/Infobiq-push-notification.service';
import {
  SendMultiplePushNotificationDto,
  SendSinglePnRequestDto,
} from './dto/send-single-pn-request.dto';
import { LogUtilService } from 'src/shared/service/log-util.service';
import { InfobiqPeopleService } from 'src/shared/service/infobiq-people.service';
import { PeopleResponseDto } from './dto/people-response-dto';
import { UpdateDeviceIdRequestDto } from './dto/update-deviceId-request-dto';

@Controller('infobiq')
export class InfobiqController {
  constructor(
    private readonly infobiqService: InfobiqService,
    private readonly infobiqPushNotifcationService: InfobiqPushNotifcationService,
    private readonly infobiqPeopleService: InfobiqPeopleService,
    private logger: LogUtilService,
  ) {
    this.logger.setContext(InfobiqController.name);
  }

  @Post('/notification/sendSingle')
  async sendSinglePushNotification(
    @Body() dto: SendSinglePnRequestDto,
  ): Promise<any> {
    this.logger.log('sendOnePushNotification', {
      dto,
    });
    return this.infobiqPushNotifcationService.sendSinglePushNotification(dto);
  }

  @Post('/notification/sendMultiple')
  async sendMultiPushNotification(
    @Body() dto: SendMultiplePushNotificationDto,
  ): Promise<any> {
    this.logger.log('sendMultiPushNotification', {
      dto,
    });
    return this.infobiqPushNotifcationService.sendMultiplePushNotification(dto);
  }

  @Get('/people/:username')
  async getPeople(
    @Param('username') username: string,
  ): Promise<PeopleResponseDto> {
    this.logger.log('getPeople');
    return this.infobiqPeopleService.getPeople(username);
  }

  @Post('/people')
  async createPeople(@Body() dto: PeopleResponseDto): Promise<any> {
    this.logger.log('createPeople');
    return this.infobiqPeopleService.createPeople(dto);
  }

  @Put('/people/:username')
  async updatePeople(
    @Param('username') username: string,
    @Body() dto: PeopleResponseDto,
  ): Promise<PeopleResponseDto> {
    this.logger.log('getPeople');
    return this.infobiqPeopleService.updatePeople(username, dto);
  }

  @Delete('/people/:username')
  async deletePeople(@Param('username') username: string): Promise<any> {
    this.logger.log('getPeople');
    return this.infobiqPeopleService.deletePeople(username);
  }

  @Post('/personalizedPushDevice')
  async personalizedPushDevice(
    @Body() dto: UpdateDeviceIdRequestDto,
  ): Promise<any> {
    try {
      this.logger.log('personalizedPushDevice');
      return await this.infobiqPeopleService.personalizedPushDevice(dto);
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  // @Put('/enablePushRegistration')
  // enablePushRegistration() {
  //   return this.infobiqService.enablePushRegistration();
  // }

  // @Delete('/disablePushRegistration')
  // disablePushRegistration() {
  //   return this.infobiqService.disablePushRegistration();
  // }

  // @Get('/getPushApplications')
  // getPushApplications() {
  //   return this.infobiqService.getPushApplications();
  // }

  // @Get('/getOnePushApplication')
  // getOnePushApplication() {
  //   return this.infobiqService.getOnePushApplications();
  // }

  // @Get('/getPushStatistics')
  // getPushStatistics() {
  //   return this.infobiqService.getPushStatistics();
  // }

  // @Get('/getPushReports')
  // getPushReports() {
  //   return this.infobiqService.getPushReports();
  // }

  // @Get('/receivePushMessages')
  // receivePushMessages() {
  //   return this.infobiqService.receivePushMessages();
  // }

  // @Get('/getConfiguration')
  // getConfiguration() {
  //   return this.infobiqService.getConfiguration();
  // }
}

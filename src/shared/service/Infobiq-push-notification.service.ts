import { Injectable } from '@nestjs/common';
import { LogUtilService } from './log-util.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  SendMultiplePushNotificationDto,
  SendSinglePnRequestDto,
} from 'src/infobiq/dto/send-single-pn-request.dto';

@Injectable()
export class InfobiqPushNotifcationService {
  constructor(
    private logger: LogUtilService,
    private readonly httpService: HttpService,
  ) {
    this.logger.setContext(InfobiqPushNotifcationService.name);
  }

  private getHeaders(): any {
    const { AUTHORIZATION_TOKEN } = process.env;
    return {
      Authorization: `${AUTHORIZATION_TOKEN}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  async sendSinglePushNotification(dto: SendSinglePnRequestDto): Promise<any> {
    const { APPLICATION_CODE, INFOBIP_BASEURL } = process.env;
    const {
      to,
      text,
      validityPeriod,
      validityPeriodTimeUnit,
      sendAt,
      customPayload,
      notifyUrl,
      notifyContentType,
      callbackData,
      targetOnlyPrimaryDevices,
      notificationOptions,
    } = dto;

    // logger
    this.logger.log('sendSinglePushNotification', {
      dto,
    });

    // body
    const data = {
      from: `${APPLICATION_CODE}`,
      to: to,
      text: text,
      validityPeriod: validityPeriod,
      validityPeriodTimeUnit: validityPeriodTimeUnit,
      sendAt: sendAt,
      customPayload: customPayload,
      notifyUrl: notifyUrl,
      notifyContentType: notifyContentType,
      callbackData: callbackData,
      targetOnlyPrimaryDevices: targetOnlyPrimaryDevices,
      notificationOptions: notificationOptions,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${INFOBIP_BASEURL}/push/2/message/single`,
          data,
          {
            headers: this.getHeaders(),
          },
        ),
      );

      return response.data;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to send push notification');
    }
  }

  async sendMultiplePushNotification(
    dto: SendMultiplePushNotificationDto,
  ): Promise<any> {
    const { APPLICATION_CODE, INFOBIP_BASEURL } = process.env;

    // logger
    this.logger.log('sendMultiplePushNotification', {
      dto,
    });

    // set from
    for (let i = 0; i < dto.messages.length; i++) {
      const element = dto.messages[i];
      element.from = APPLICATION_CODE;
    }

    // body
    const data = dto;

    try {
      const response = await firstValueFrom(
        this.httpService.post(`${INFOBIP_BASEURL}/push/2/message/multi`, data, {
          headers: this.getHeaders(),
        }),
      );

      return response.data;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to send push notification');
    }
  }
}

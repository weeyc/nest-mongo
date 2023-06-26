import { Injectable } from '@nestjs/common';
import { LogUtilService } from './log-util.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PeopleResponseDto } from 'src/infobiq/dto/people-response-dto';
import { plainToClass } from 'class-transformer';
import { UpdateDeviceIdRequestDto } from 'src/infobiq/dto/update-deviceId-request-dto';

@Injectable()
export class InfobiqPeopleService {
  constructor(
    private logger: LogUtilService,
    private readonly httpService: HttpService,
  ) {
    this.logger.setContext(InfobiqPeopleService.name);
  }

  private getHeaders(): any {
    const { AUTHORIZATION_TOKEN, APPLICATION_CODE } = process.env;
    return {
      Authorization: `${AUTHORIZATION_TOKEN}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      AppCode: `${APPLICATION_CODE}`,
    };
  }

  async getPeople(externalId: string): Promise<PeopleResponseDto> {
    const { INFOBIP_BASEURL } = process.env;

    // logger

    this.logger.log('getPeople', {
      externalId,
    });

    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${INFOBIP_BASEURL}/people/2/persons?externalId=${externalId}`,
          {
            headers: this.getHeaders(),
          },
        ),
      );

      const peopleResponseDto = plainToClass(PeopleResponseDto, response.data);

      return peopleResponseDto;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to get InfoBip People');
    }
  }

  async createPeople(dto: PeopleResponseDto): Promise<PeopleResponseDto> {
    const { INFOBIP_BASEURL } = process.env;

    // logger

    this.logger.log('createPeople', {
      dto,
    });

    const data = dto;

    try {
      const response = await firstValueFrom(
        this.httpService.post(`${INFOBIP_BASEURL}/people/2/persons`, data, {
          headers: this.getHeaders(),
        }),
      );

      return response.data;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to create InfoBip People');
    }
  }

  async updatePeople(
    externalId: string,
    dto: PeopleResponseDto,
  ): Promise<PeopleResponseDto> {
    const { INFOBIP_BASEURL } = process.env;

    // logger
    this.logger.log('getPeople', {
      externalId,
    });

    const data = dto;

    console.log(data);

    try {
      const response = await firstValueFrom(
        this.httpService.put(
          `${INFOBIP_BASEURL}/people/2/persons?externalId=${externalId}`,
          data,
          {
            headers: this.getHeaders(),
          },
        ),
      );

      const peopleResponseDto = plainToClass(PeopleResponseDto, response.data);

      return peopleResponseDto;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to update InfoBip People');
    }
  }

  async deletePeople(externalId: string): Promise<PeopleResponseDto> {
    const { INFOBIP_BASEURL } = process.env;

    // logger

    this.logger.log('getPeople', {
      externalId,
    });

    try {
      const response = await firstValueFrom(
        this.httpService.delete(
          `${INFOBIP_BASEURL}/people/2/persons?externalId=${externalId}`,
          {
            headers: this.getHeaders(),
          },
        ),
      );

      return response.data;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to delete InfoBip People');
    }
  }

  async personalizedPushDevice(dto: UpdateDeviceIdRequestDto): Promise<any> {
    const { INFOBIP_BASEURL } = process.env;

    // logger
    this.logger.log('personalizedPushDevice', {
      dto,
    });

    const data = {
      identity: {
        externalId: dto.username,
      },
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${INFOBIP_BASEURL}/people/2/contactInformation/push/${dto.pushRegId}/personalize`,
          data,
          {
            headers: this.getHeaders(),
          },
        ),
      );

      return response.data;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to personalizedPushDevice');
    }
  }
}

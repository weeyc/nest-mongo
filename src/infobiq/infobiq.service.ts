import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

//const hostname = 'xrplmq.api.infobip.com';
const hostname = 'qg6312.api.infobip.com';

// weeycoder

// const authorization =
//   'App 48cbf9719d0db041abe72cd0a564d6d4-d72a32cf-edb7-417c-a864-8af7c0628028';
// const applicationCode =
//   'f43e337036cf0aa8a043a3f776352363-c909a352-1113-47e0-b955-7b90fde5210c';

//const userPushRegistrationId = '16165451-D39D-49F9-88D2-A62A4323D58C';

// wyczonline
//const userPushRegistrationId = '7C31009F-70FE-4B92-98A7-7672E7E286BE';
const userPushRegistrationId = 'FB1EA225-220D-4711-949B-D2C4AE965944';

const applicationCode =
  'f844c9352bf350132d9e6650abe014d9-c73a6f09-fb77-4b1c-b5e9-c6a34248b620';

const authorization =
  'App 3600bded2f8373f2de225f8882ce07b3-25a8a027-1d8c-43c3-a434-4055e9dcb8e2';

@Injectable()
export class InfobiqService {
  constructor(private readonly httpService: HttpService) {}
  async sendSinglePushNotification(): Promise<any> {
    const options = {
      method: 'POST',
      hostname: hostname,
      path: '/push/2/message/single',
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      maxRedirects: 20,
    };

    const postData = {
      from: applicationCode,
      to: {
        pushRegistrationId: userPushRegistrationId,
      },
      text: 'This Message was sent by targeting exact externalUserId.',
    };

    try {
      const response = await this.httpService
        .post(
          `https://${options.hostname}${options.path}`,
          { data: postData },
          {
            maxRedirects: options.maxRedirects,
            headers: options.headers,
          },
        )
        .toPromise();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to send push notification');
    }
  }

  async sendMultiplePushNotification(): Promise<any> {
    const options = {
      method: 'POST',
      hostname: hostname,
      path: '/push/2/message/multi',
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      maxRedirects: 20,
    };

    const postData = {
      messages: [
        {
          from: applicationCode,
          to: {
            pushRegistrationId: userPushRegistrationId,
          },
          text: 'This Message was sent by targeting exact externalUserId.',
        },
      ],
    };

    try {
      const response = await this.httpService
        .post(`https://${options.hostname}${options.path}`, postData, {
          maxRedirects: options.maxRedirects,
          headers: options.headers,
        })
        .toPromise();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to send push notification');
    }
  }

  async enablePushRegistration(): Promise<any> {
    const options = {
      method: 'PUT',
      hostname: hostname,
      path: `/push/1/applications/${applicationCode}/registrations/${userPushRegistrationId}/enabled`,
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      maxRedirects: 20,
    };

    try {
      const response = await this.httpService
        .put(`https://${options.hostname}${options.path}`, {
          maxRedirects: options.maxRedirects,
          headers: options.headers,
        })
        .toPromise();
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to enable push registration');
    }
  }

  async disablePushRegistration(): Promise<any> {
    const options = {
      method: 'DELETE',
      hostname: hostname,
      path: `/push/1/applications/${applicationCode}/registrations/${userPushRegistrationId}/enabled`,
      headers: {
        Authorization: authorization,
        Accept: 'application/json',
      },
      maxRedirects: 20,
    };

    try {
      const response = await this.httpService
        .delete(`https://${options.hostname}${options.path}`, {
          maxRedirects: options.maxRedirects,
          headers: options.headers,
        })
        .toPromise();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to enable push notification');
    }
  }

  async getPushApplications(): Promise<any> {
    const options = {
      method: 'GET',
      hostname: hostname,
      path: '/push/1/applications',
      headers: {
        Authorization: authorization,
        Accept: 'application/json',
      },
      maxRedirects: 20,
    };

    try {
      const response = await this.httpService
        .get(`https://${options.hostname}${options.path}`, {
          maxRedirects: options.maxRedirects,
          headers: options.headers,
        })
        .toPromise();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to enable push notification');
    }
  }

  async getOnePushApplications(): Promise<any> {
    const options = {
      method: 'GET',
      hostname: hostname,
      path: `/push/1/applications/${applicationCode}`,
      headers: {
        Authorization: authorization,
        Accept: 'application/json',
      },
      maxRedirects: 20,
    };

    try {
      const response = await this.httpService
        .get(`https://${options.hostname}${options.path}`, {
          maxRedirects: options.maxRedirects,
          headers: options.headers,
        })
        .toPromise();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to enable push notification');
    }
  }

  async getPushStatistics(): Promise<any> {
    const options = {
      method: 'GET',
      hostname: hostname,
      path: `/push/1/statistics?bulkId=x5xgz4urplkk61ixzcqq`,
      headers: {
        Authorization: authorization,
        Accept: 'application/json',
      },
      maxRedirects: 20,
    };

    try {
      const response = await this.httpService
        .get(`https://${options.hostname}${options.path}`, {
          maxRedirects: options.maxRedirects,
          headers: options.headers,
        })
        .toPromise();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to enable push notification');
    }
  }

  async getPushReports(): Promise<any> {
    const options = {
      method: 'GET',
      hostname: hostname,
      path: `/push/1/reports?bulkId=x5xgz4urplkk61ixzcqq`,
      headers: {
        Authorization: authorization,
        Accept: 'application/json',
      },
      maxRedirects: 20,
    };

    try {
      const response = await this.httpService
        .get(`https://${options.hostname}${options.path}`, {
          maxRedirects: options.maxRedirects,
          headers: options.headers,
        })
        .toPromise();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to enable push notification');
    }
  }

  async receivePushMessages(): Promise<any> {
    const options = {
      method: 'GET',
      hostname: hostname,
      path: `/push/1/inbox/reports`,
      headers: {
        Authorization: authorization,
        Accept: 'application/json',
      },
      maxRedirects: 20,
    };

    try {
      const response = await this.httpService
        .get(`https://${options.hostname}${options.path}`, {
          maxRedirects: options.maxRedirects,
          headers: options.headers,
        })
        .toPromise();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to enable push notification');
    }
  }

  async getConfiguration(): Promise<any> {
    const options = {
      method: 'GET',
      hostname: hostname,
      path: `push/1/applications/${applicationCode}/configurations`,
      headers: {
        Authorization: authorization,
        Accept: 'application/json',
      },
      maxRedirects: 20,
    };

    try {
      const response = await this.httpService
        .get(`https://${options.hostname}${options.path}`, {
          maxRedirects: options.maxRedirects,
          headers: options.headers,
        })
        .toPromise();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get all configuration');
    }
  }
}

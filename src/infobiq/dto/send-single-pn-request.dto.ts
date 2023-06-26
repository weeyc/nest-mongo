import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

/// INFOBIP: Send single push notification body details:
/// https://www.infobip.com/docs/api/channels/mobile-app-messaging/send-single-push-notification

export enum ActionType {
  WEB_VIEW_URL = 'WEB_VIEW_URL',
  DEEP_LINK = 'DEEP_LINK',
  OPEN_URL_IN_BROWSER = 'OPEN_URL_IN_BROWSER',
}

export enum InAppStyle {
  MODAL = 'MODAL',
  BANNER = 'BANNER',
}

export enum InAppExpirationTimeUnit {
  MINUTES = 'MINUTES',
  HOURS = 'HOURS',
}

export class primaryButtonActionDto {
  @ApiProperty({ example: 'https://etiqa.com.my' })
  @IsOptional()
  readonly resource: string;

  @ApiProperty({ example: 'DEEP_LINK' })
  @IsOptional()
  @IsEnum(ActionType, { message: 'incorrect actionType' })
  readonly type: ActionType;
}

export class toDto {
  @ApiProperty({ example: 'weeeusername' })
  @IsNotEmpty()
  @IsString()
  readonly externalUserId: string;
}

export class NotificationOptionDto {
  @ApiProperty({ example: 'Welcome to Etiqa+' })
  @IsOptional()
  @IsString()
  @Length(1, 45)
  readonly title: string;

  @IsOptional()
  @IsBoolean()
  readonly soundEnabled: boolean;

  @IsOptional()
  @IsBoolean()
  readonly vibrationEnabled: boolean;

  @IsOptional()
  @IsBoolean()
  readonly isSilent: boolean;

  @IsOptional()
  @IsNumber()
  readonly badge: number;

  @ApiProperty({ example: 'https://picsum.photos/200/300' })
  @IsOptional()
  @IsString()
  readonly contentUrl: string;

  @IsOptional()
  @IsString()
  readonly category: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly showInApp: boolean = false;

  @ApiProperty({ example: 'BANNER', enum: InAppStyle })
  @IsOptional()
  @IsEnum(InAppStyle, { message: 'Incorrect inAppStyle' })
  readonly inAppStyle: InAppStyle;

  @IsOptional()
  @IsNumber()
  readonly inAppExpirationPeriod: number;

  @IsOptional()
  @IsEnum(InAppExpirationTimeUnit, {
    message: 'Incorrect inAppExpirationTimeUnit',
  })
  readonly inAppExpirationTimeUnit: InAppExpirationTimeUnit;

  @IsOptional()
  @IsString()
  readonly inAppDismissTitle: string;

  @IsOptional()
  @IsString()
  readonly inAppOpenTitle: string;

  @ApiProperty({ type: () => primaryButtonActionDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => primaryButtonActionDto)
  readonly primaryButtonAction: primaryButtonActionDto;

  @IsOptional()
  readonly inboxTopic: string;
}

export class SendSinglePnRequestDto {
  from: string;

  @ApiProperty({ required: true })
  @ValidateNested()
  @Type(() => toDto)
  @IsNotEmpty()
  readonly to: toDto;

  @ApiProperty({
    required: true,
    minLength: 1,
    maxLength: 4000,
    type: String,
    example:
      'An all-in-one app which can make you smile with Fast & Easy solutions at your fingertips.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 4000)
  readonly text: string;

  @IsOptional()
  readonly validityPeriod: number;

  @IsOptional()
  readonly validityPeriodTimeUnit: string;

  @IsOptional()
  @IsDateString()
  readonly sendAt: string;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  readonly customPayload: object;

  @ApiProperty({ type: () => NotificationOptionDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => NotificationOptionDto)
  readonly notificationOptions: NotificationOptionDto;

  @IsOptional()
  readonly notifyUrl: string;

  @IsOptional()
  readonly notifyContentType: string;

  @IsOptional()
  readonly callbackData: string;

  @IsOptional()
  @IsBoolean()
  readonly targetOnlyPrimaryDevices: boolean;
}

export class SendMultiplePushNotificationDto {
  @ApiProperty({ type: () => [SendSinglePnRequestDto] })
  @ValidateNested()
  @Type(() => SendSinglePnRequestDto)
  messages: SendSinglePnRequestDto[];
}

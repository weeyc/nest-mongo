import { ApiProperty } from '@nestjs/swagger';

class Phone {
  @ApiProperty()
  number: string;
}

class Email {
  @ApiProperty()
  address: string;
}

export class AdditionalDataDto {
  birthdate: string;
  email: string;
  firstName: string;
  gender: string;
  lastName: string;
  middleName: string;
}

export class SystemDataDto {
  cloudType: string;
  registrationEnabled: boolean;
  sdkName: string;
  os: string;
}

export class PushDto {
  applicationId: string;
  registrationId: string;
  additionalData: AdditionalDataDto;
  systemData: SystemDataDto;
}

class ContactInformation {
  @ApiProperty({ type: () => Phone, isArray: true })
  phone: Phone[];

  @ApiProperty({ type: () => Email, isArray: true })
  email: Email[];

  @ApiProperty({ type: () => PushDto, isArray: true })
  push: PushDto[];
}

export class PeopleResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  externalId: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  middleName: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  birthDate: string;

  @ApiProperty()
  profilePicture: string;

  @ApiProperty()
  origin: string;

  @ApiProperty()
  modifiedFrom: string;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  contactInformation: ContactInformation;
}

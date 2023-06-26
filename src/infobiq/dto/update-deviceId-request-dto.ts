import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateDeviceIdRequestDto {
  @ApiProperty()
  @IsString()
  pushRegId: string;

  @ApiProperty()
  @IsString()
  username: string;
}

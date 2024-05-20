import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RegisterUserDTO {
  @ApiProperty({
    description: 'User email',
    name: 'email',
  })
  @IsEmail()
  email: string;
}

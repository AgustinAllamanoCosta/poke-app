import { IsEmail } from 'class-validator';

export class RegisterUserDTO {
  @IsEmail()
  email: string;

}

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterResponse } from 'src/types/auth';
import { RegisterUserDTO } from './RegisterUserDTO';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async registerPokeUser(@Body() body: RegisterUserDTO): Promise<RegisterResponse> {
    return await this.authService.registerUser(body.email);
  }
}

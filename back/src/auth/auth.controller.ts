import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterResponse } from 'src/types/auth';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async registerPokeUser(@Body() email: string): Promise<RegisterResponse> {
    return await this.authService.registerUser(email);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterResponse } from 'src/types/auth';
import { RegisterUserDTO } from './RegisterUserDTO';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiHeader({
  name: 'Auhtorization',
  description: 'google auth header',
})
@ApiTags('Auth')
@Controller('register')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('/')
  @ApiOperation({ summary: 'Add a new user into then data base' })
  @ApiResponse({ status: 201, description: 'Add a new user into the data base by email'})
  @ApiResponse({ status: 401, description: 'Not Authorized'})
  @ApiResponse({ status: 500, description: 'App can not connect to the db'})
  async registerPokeUser(
    @Body() body: RegisterUserDTO,
  ): Promise<RegisterResponse> {
    return await this.authService.registerUser(body.email);
  }
}

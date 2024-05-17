import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { Repository } from 'typeorm';
import { PokeUser } from './entity/pokeUser.entity';
import { ConfigService } from '@nestjs/config';
import { pokeUserFactory } from '../../test/fixture/auth';
import { RegisterResponse } from 'src/types/auth';

@Injectable()
export class AuthService {
  private readonly googleClient: OAuth2Client;
  private readonly errorMessage: string = 'Invalid Token';

  constructor(
    @InjectRepository(PokeUser)
    private userRepository: Repository<PokeUser>,
    private readonly configuration: ConfigService,
  ) {
    this.googleClient = new OAuth2Client();
  }

  public async validateToken(idToken: string): Promise<TokenPayload> {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: this.configuration.get<string>('oauth_client'),
      });
      return ticket.getPayload();
    } catch (error) {
      throw new Error(this.errorMessage);
    }
  }

  public async validateUser(email: string): Promise<void> {
    const pokeUser: PokeUser = await this.userRepository.findOneBy({ email });

    if (!pokeUser) {
      throw new Error(this.errorMessage);
    }

    pokeUser.lastConnection = new Date();
    await this.userRepository.save(pokeUser);
  }

  public async registerUser(email: string): Promise<RegisterResponse> {
    const pokeUser: PokeUser | null = await this.userRepository.findOneBy({
      email,
    });

    if (pokeUser) {
      return { wasUserCreated: false };
    }
    const newUser: PokeUser = pokeUserFactory(email);
    this.userRepository.save(newUser);
    return { wasUserCreated: true };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { Repository } from 'typeorm';
import { PokeUser } from './entity/pokeUser.entity';
import { ConfigService } from '@nestjs/config';

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
}

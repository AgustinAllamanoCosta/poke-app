import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly configuration: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.getAuthToken(req);

    if (!token) {
      return res.status(401).json({
        type: 'AUTH_TOKEN',
        message: 'Auth token not present in the request',
      });
    }

    if (this.configuration.get<number>('auth') == 0) {
      next();
      return;
    }

    try {
      const googleTokenInfo = await this.authService.validateToken(token);

      const email: string = googleTokenInfo['email'];

      if (!email) {
        throw new BadRequestException('Invalid Token, not emial');
      }

      await this.authService.validateUser(email);
      next();
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .json({ type: 'INVALID_TOKEN', message: error.message });
    }
  }

  private getAuthToken(req: Request): string | undefined {
    const auth = req.headers.authorization;

    if (!auth) {
      return undefined;
    }

    if (!auth.includes('Bearer')) {
      return undefined;
    }

    return req.headers.authorization?.split(' ')[1];
  }
}

import { AuthController } from './auth.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { pokeEmail, pokeUserFactory } from '../../test/fixture/auth';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { PokeUser } from './entity/pokeUser.entity';

describe('Auth Controller', () => {
  let authController: AuthController;
  let userRepo: Repository<PokeUser>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, ConfigService],
    })
      .useMocker((token) => {
        if (token === 'PokeUserRepository') {
          return {
            save: jest.fn(),
            findOneBy: jest.fn().mockImplementation(() => null),
          };
        }
      })
      .compile();

    authController = app.get<AuthController>(AuthController);
    userRepo = app.get<Repository<PokeUser>>('PokeUserRepository');
  });

  it('Should register an new poke user', async () => {
    const registerUser = await authController.registerPokeUser(pokeEmail);

    expect({ wasUserCreated: true }).toStrictEqual(registerUser);
  });

  it('Should not register an user which already exist in the database', async () => {
    userRepo.findOneBy = jest.fn().mockResolvedValue(pokeUserFactory());

    const registerUser = await authController.registerPokeUser(pokeEmail);

    expect({ wasUserCreated: false }).toStrictEqual(registerUser);
  });
});

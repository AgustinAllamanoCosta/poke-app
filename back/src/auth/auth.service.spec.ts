import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { PokeUser } from './entity/pokeUser.entity';
import { pokeUserFactory } from '../../test/fixture/auth';

describe('AuthService', () => {
  let service: AuthService;
  let userRepo: Repository<PokeUser>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, ConfigService],
    })
      .useMocker((token) => {
        if (token === 'PokeUserRepository') {
          return {
            save: jest.fn(),
            findOneBy: jest
              .fn()
              .mockImplementation(({ email }) => pokeUserFactory(email)),
          };
        }
      })
      .compile();

    service = module.get<AuthService>(AuthService);
    userRepo = module.get<Repository<PokeUser>>('PokeUserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Shoudl save a pokeUser in the data base', async () => {
    const someUserEmail: string = 'ash.ketchum@gamil.com';
    const timeToBeSave: number = 1;

    await service.validateUser(someUserEmail);

    expect(userRepo.save).toBeCalledTimes(timeToBeSave);
  });
});

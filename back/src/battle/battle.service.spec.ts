import { Test, TestingModule } from '@nestjs/testing';
import { BattleService } from './battle.service';

describe('BattleService', () => {
  let service: BattleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BattleService],
    })
      .useMocker((token) => {
        if (token === 'PokeCardRepository') {
          return {
            save: jest.fn(),
            findOneBy: jest.fn().mockImplementation(() => {
              return null;
            }),
          };
        }
        if (token === 'PokeUserRepository') {
          return {
            findOne: jest.fn(),
            save: jest.fn(),
          };
        }
      })
      .compile();

    service = module.get<BattleService>(BattleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

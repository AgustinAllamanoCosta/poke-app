import { Test, TestingModule } from '@nestjs/testing';
import { BattleController } from './battle.controller';
import { BattleService } from './battle.service';
import { CardsService } from '../cards/cards.service';

describe('BattleController', () => {
  let controller: BattleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BattleController],
      providers:[ BattleService, CardsService ]
    }).useMocker((token) => {
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

    controller = module.get<BattleController>(BattleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';
import { CreateCardsDTO } from './CardsDTO';
import { cardsDTOFactory } from '../../test/fixture/cards';
import { Repository } from 'typeorm';
import { PokeCard } from './entity/Card.Entity';
import { PokeUser } from '../auth/entity/pokeUser.entity';
import { pokeUserFactory } from '../../test/fixture/auth';

describe('CardsService', () => {
  let service: CardsService;
  let cardRepo: Repository<PokeCard>;
  let userRepo: Repository<PokeUser>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardsService],
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
            findOneBy: jest.fn(),
            save: jest.fn(),
          };
        }
      })
      .compile();

    service = module.get<CardsService>(CardsService);
    cardRepo = module.get<Repository<PokeCard>>('PokeCardRepository');
    userRepo = module.get<Repository<PokeUser>>('PokeUserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create a card into the database', async () => {
    const newCard: CreateCardsDTO = cardsDTOFactory();
    const user: PokeUser = pokeUserFactory();
    jest.spyOn(userRepo, 'findOneBy').mockResolvedValue(user);
    const numberOfCardsCreated: number = 1;
    const numberOfUserFounds: number = 1;
    const numberOfUserUpdated: number = 1;

    await service.createNewCard(newCard);

    expect(cardRepo.save).toBeCalledTimes(numberOfCardsCreated);
    expect(userRepo.findOneBy).toBeCalledTimes(numberOfUserFounds);
    expect(userRepo.save).toBeCalledTimes(numberOfUserUpdated);
  });
});

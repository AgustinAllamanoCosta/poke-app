import { Test, TestingModule } from '@nestjs/testing';
import { CardsController } from './cards.controller';
import { CreateCardsDTO } from './CardsDTO';
import { CardsService } from './cards.service';
import { cardsDTOFactory } from '../../test/fixture/cards';
import { pokeUserFactory } from '../../test/fixture/auth';

describe('CardsController', () => {
  let controller: CardsController;
  let service: CardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [CardsService],
    })
      .useMocker((token) => {
        if (token === 'PokeCardRepository') {
          return {
            save: jest.fn(),
            findOneBy: jest.fn(),
          };
        }
        if (token === 'PokeUserRepository') {
          return {
            save: jest.fn(),
            findOneBy: jest.fn().mockResolvedValue(pokeUserFactory()),
          };
        }
      })
      .compile();

    controller = module.get<CardsController>(CardsController);
    service = module.get<CardsService>(CardsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should call the service method create Card', async () => {
    const cardsDto: CreateCardsDTO = cardsDTOFactory();
    jest.spyOn(service, 'createNewCard');

    await controller.createCard(cardsDto);

    expect(service.createNewCard).toBeCalled();
  });
});

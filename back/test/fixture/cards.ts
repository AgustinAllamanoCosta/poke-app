import { CreateCardsDTO } from '../../src/cards/CardsDTO';
import { CARD_TYPE, POKEMON_TYPE } from '../../src/types/cards';

export const cardsDTOFactory = (): CreateCardsDTO => {
  const newCard: CreateCardsDTO = new CreateCardsDTO();

  newCard.pokemonType = POKEMON_TYPE.ELECTRIC;
  newCard.expansion = '';
  newCard.userId = 'some-user-id';
  newCard.cardtype = CARD_TYPE.COMMON;
  newCard.attack = 100;
  newCard.name = 'Picachu';
  newCard.hp = 100;

  return newCard;
};

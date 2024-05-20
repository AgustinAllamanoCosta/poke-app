import { Injectable } from '@nestjs/common';
import { CardRivalsDTO, CreateCardsDTO, PokeCardDTO } from './CardsDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { PokeCard } from './entity/Card.Entity';
import { Repository } from 'typeorm';
import { PokeUser } from '../auth/entity/pokeUser.entity';
import { CardRivals, POKEMON_TYPE } from 'src/types/cards';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(PokeCard)
    private readonly cardsRepository: Repository<PokeCard>,
    @InjectRepository(PokeUser)
    private readonly usersRepository: Repository<PokeUser>,
  ) {}

  public async createNewCard(createCardDTO: CreateCardsDTO): Promise<void> {
    console.group('creation new card');
    const user: PokeUser | null = await this.usersRepository.findOne({ where: { id: createCardDTO.userId }, relations: ['cards']});

    console.debug('user found ', user);

    if (user === null) {
      throw new Error('User not found');
    }

    const cardInBase: PokeCard | null = await this.cardsRepository.findOneBy({
      name: createCardDTO.name,
      pokemonType: createCardDTO.pokemonType,
      cardtype: createCardDTO.cardtype,
    });
    console.debug('card in base', cardInBase);

    if (cardInBase) {
      console.debug('Card already exist');
      user.cards.push(cardInBase);
      this.addCardToUser(user,cardInBase);
      await this.usersRepository.save(user);

    } else {

      const newCard: PokeCard = new PokeCard();
      console.debug('new card', newCard);
      this.mapCardDTOToNewCard(newCard,createCardDTO,user);
      this.addCardToUser(user,newCard);
      console.debug('user with new card', user);
      await this.usersRepository.save(user);
      await this.cardsRepository.save(newCard);
      console.groupEnd();
    }
  }

  public async getAllCardsByUserId(id: string): Promise<Array<PokeCardDTO>> {
    const user: PokeUser | null = await this.usersRepository.findOne({ where: { id }, relations: ['cards']});
    console.debug('cards in user id ', id, user.cards);
    if (user) {
      return user.cards.map(card => Object.assign(new PokeCardDTO(), card));
    } else {
      return [];
    }
  }


  public async getCardByName(name: string): Promise<PokeCard | null> {
    return await this.cardsRepository.findOneBy({ name });
  }

  public async getCardById(id: string): Promise<PokeCard | null> {
    const cardEntity: PokeCard | null = await this.cardsRepository.findOneBy({ id });
    if(cardEntity){
      return Object.assign(new PokeCardDTO(), cardEntity);
    }
    return null;
  }

  public async removeCard(id: string): Promise<void> {
    const cardToRemove: PokeCard | null = await this.cardsRepository.findOneBy({
      id,
    });
    if (cardToRemove) {
      this.cardsRepository.remove(cardToRemove);
    }
  }

  public async removeCardFromUser(
    userId: string,
    cardId: string,
  ): Promise<void> {
    const card: PokeCard | null = await this.cardsRepository.findOne({ where: { id: cardId }, relations: ['pokeUser']});

    if (!card) {
      return;
    }

    const user: PokeUser | null = await this.usersRepository.findOne({ where: { id: userId }, relations: ['cards']});
    if (!user) {
      return;
    }

    card.pokeUser = card.pokeUser.filter((u) => u.id !== userId);

    await this.cardsRepository.save(card);
  }

  public async updateCard(id: string, attrs: Partial<PokeCard>): Promise<void> {
    const card: PokeCard | null = await this.cardsRepository.findOneBy({ id });
    Object.assign(card, attrs);
    await this.cardsRepository.save(card);
  }

  public async getCardRivals(cardId: string): Promise<CardRivalsDTO> {
    const mainCard: PokeCard | null = await this.cardsRepository.findOneBy({ id: cardId });
    const result: CardRivals = {
      weaknessAgains: [],
      resistanceAgains: []
    };
    if(mainCard){
      const resistanceCard: PokeCard[] | null = await this.cardsRepository.findBy({ pokemonType: mainCard.resistance.type });
      const weaknessCard: PokeCard[] | null = await this.cardsRepository.findBy({ pokemonType: mainCard.weakness.type })
      if(resistanceCard){
        result.resistanceAgains = resistanceCard.map(card => Object.assign(new PokeCardDTO(), card));
      }
      if(weaknessCard){
        result.weaknessAgains = weaknessCard.map(card => Object.assign(new PokeCardDTO(), card));
      }
    }

    return result;

  }

  private addCardToUser(user:PokeUser, card: PokeCard){
      if(user.cards){
        user.cards.push(card);
      }else{
        user.cards = [card];
      }
  }

  private mapCardDTOToNewCard(newCard: PokeCard, DTO: CreateCardsDTO, user: PokeUser): void{
      newCard.pokeUser = [user];
      Object.assign(newCard, DTO);
      newCard.weakness = { type: DTO.weaknesType, multiplier: DTO.weaknessMultiplier };
      newCard.resistance = { type: DTO.resistanceType, points: DTO.resistancePoint };
  };
}

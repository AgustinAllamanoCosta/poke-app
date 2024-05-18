import { Injectable } from '@nestjs/common';
import { CreateCardsDTO } from './CardsDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { PokeCard } from './entity/Card.Entity';
import { Repository } from 'typeorm';
import { PokeUser } from '../auth/entity/pokeUser.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(PokeCard)
    private readonly cardsRepository: Repository<PokeCard>,
    @InjectRepository(PokeUser)
    private readonly usersRepository: Repository<PokeUser>,
  ) {}

  public async createNewCard(createCardDTO: CreateCardsDTO): Promise<void> {
    const user: PokeUser | null = await this.usersRepository.findOneBy({
      id: createCardDTO.userId,
    });

    if (user === null) {
      throw new Error('User not found');
    }

    const cardInBase: PokeCard | null = await this.cardsRepository.findOneBy({
      name: createCardDTO.name,
      pokemonType: createCardDTO.pokemonType,
      cardtype: createCardDTO.cardtype,
    });

    if (cardInBase) {

      cardInBase.pokeUser.push(user);
      await this.cardsRepository.save(cardInBase);

    } else {
      const newCard: PokeCard = new PokeCard();
      newCard.pokeUser = [user];
      newCard.cardtype = createCardDTO.cardtype;
      newCard.pokemonType = createCardDTO.pokemonType;
      newCard.name = createCardDTO.name;
      newCard.hp = createCardDTO.hp;
      newCard.attack = createCardDTO.attack;
      newCard.expansion = createCardDTO.expansion;

      user.cards.push(newCard);
    
      await this.usersRepository.save(user);
      await this.cardsRepository.save(newCard);
    }
  }
}

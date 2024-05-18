import { Body, Controller, Post } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardsDTO } from './CardsDTO';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @Post()
  public async createCard(@Body() newCard: CreateCardsDTO) {
    await this.cardService.createNewCard(newCard);
  }
}

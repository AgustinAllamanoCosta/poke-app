import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardsDTO } from './CardsDTO';
import { UpdateCardDTO } from './UpdateCardDTO';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @Post()
  public async createCard(@Body() newCard: CreateCardsDTO) {
    try {
      await this.cardService.createNewCard(newCard);
    } catch (error: any) {
      console.error(
        'an error ocurred when some one try to create a card or updated',
      );
      console.error(error.message);
      console.error(error);
    }
  }

  @Get('/user/:id')
  public async returnAllCards(@Param('id') id: string) {
    return await this.cardService.getAllCardsByUserId(id);
  }

  @Get('/:id')
  public async returnACard(@Param('id') id: string) {
    return await this.cardService.getCardById(id);
  }

  @Delete('/:id')
  public async removeCard(@Param('id') id: string) {
    return await this.cardService.removeCard(id);
  }

  @Delete('/user/:id')
  public async removeCardfFromUser(
    @Param('id') userId: string,
    @Query('id') cardId: string,
  ) {
    return await this.cardService.removeCardFromUser(userId, cardId);
  }

  @Patch('/:id')
  public async updateCard(
    @Param('id') id: string,
    @Body() body: UpdateCardDTO,
  ) {
    return await this.cardService.updateCard(id, body);
  }

  @Get('/:id/rivals')
  public async getAllTheWeaknessesAndResistanceCards(@Param('id') id: string){
    return await this.cardService.getCardRivals(id);
  }
}

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
import { CardRivalsDTO, CreateCardsDTO, PokeCardDTO } from './CardsDTO';
import { UpdateCardDTO } from './UpdateCardDTO';
import { ApiBody, ApiHeader, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiHeader({
  name: 'Auhtorization',
  description: 'google auth header',
})
@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new card' })
  @ApiResponse({ status: 201, description: 'Create card in the user'})
  @ApiResponse({ status: 401, description: 'Not Authorized'})
  @ApiResponse({ status: 500, description: 'App can not connect to the db'})
  @ApiBody({ type: CreateCardsDTO })
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
  @ApiOperation({ summary: 'Retrive all the cards of a user' })
  @ApiResponse({ status: 201, description: 'A list of pokemon card', type: [PokeCardDTO] })
  @ApiResponse({ status: 401, description: 'Not Authorized'})
  @ApiResponse({ status: 500, description: 'App can not connect to the db'})
  public async returnAllCards(@Param('id') id: string): Promise<Array<PokeCardDTO>>  {
    return await this.cardService.getAllCardsByUserId(id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Retrive a card by id' })
  @ApiResponse({ status: 201, description: 'The card maching with the id', type: PokeCardDTO })
  @ApiResponse({ status: 401, description: 'Not Authorized'})
  @ApiResponse({ status: 500, description: 'App can not connect to the db'})
  public async returnACard(@Param('id') id: string): Promise<PokeCardDTO | null > {
    return await this.cardService.getCardById(id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a card by id' })
  @ApiResponse({ status: 200, description: 'Card removed'})
  @ApiResponse({ status: 401, description: 'Not Authorized'})
  @ApiResponse({ status: 500, description: 'App can not connect to the db'})
  public async removeCard(@Param('id') id: string) {
    return await this.cardService.removeCard(id);
  }

  @Delete('/user/:userId')
  @ApiOperation({ summary: 'Remove card for a user' })
  @ApiResponse({ status: 200, description: 'Card removed'})
  @ApiResponse({ status: 401, description: 'Not Authorized'})
  @ApiResponse({ status: 500, description: 'App can not connect to the db'})
  public async removeCardfFromUser(
    @Param('userId') userId: string,
    @Query('id') cardId: string,
  ) {
    return await this.cardService.removeCardFromUser(userId, cardId);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a card by id' })
  @ApiResponse({ status: 200, description: 'Card updated'})
  @ApiResponse({ status: 401, description: 'Not Authorized'})
  @ApiResponse({ status: 500, description: 'App can not connect to the db'})
  @ApiBody({ type: UpdateCardDTO })
  public async updateCard(
    @Param('id') id: string,
    @Body() body: UpdateCardDTO,
  ) {
    return await this.cardService.updateCard(id, body);
  }

  @Get('/:id/rivals')
  @ApiOperation({ summary: 'Get weakness and resistance of a card' })
  @ApiOkResponse({ description: 'List of cards weakness and resistance', type: CardRivalsDTO})
  @ApiResponse({ status: 401, description: 'Not Authorized'})
  @ApiResponse({ status: 500, description: 'App can not connect to the db'})
  public async getAllTheWeaknessesAndResistanceCards(@Param('id') id: string){
    return await this.cardService.getCardRivals(id);
  }
}

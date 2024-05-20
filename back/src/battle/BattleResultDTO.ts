import { ApiProperty } from "@nestjs/swagger";

export class BattlerResultDTO {

  @ApiProperty()
  challengerName: string;
  
  @ApiProperty()
  rivalName: string;

  @ApiProperty()
  challengerDefeatRival: boolean;
}

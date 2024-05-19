export enum POKEMON_TYPE {
  ELECTRIC = 'Electric',
}
export enum CARD_TYPE {
  COMMON = 'Common',
}

export type Weakness = {
  multiplier: number;
  type: POKEMON_TYPE;
};

export type Resistance = {
  points: number;
  type: POKEMON_TYPE;
};

export enum POKEMON_TYPE {
  NORMAL = 'Normal',
  FIRE = 'Fire',
  WATER = 'Water',
  GRASS = 'Grass',
  ICE = 'Ice',
  FIGHTING = 'Fighting',
  POISON = 'Poison',
  GROUND = 'Ground',
  FLYING = 'Flying',
  PSYCHIC = 'Psychic',
  BUG = 'Bug',
  ROCK = 'Rock',
  GHOST = 'Ghost',
  DRAGON = 'Dragon',
  DARK = 'Dark',
  STEEL = 'Steel',
  ELECTRIC = 'Electric',
  FAIRY = 'Fairy',
}

export enum CARD_TYPE {
  COMMON = 'Common',
  UNCOMMON = 'Uncommon',
  RARE = 'Rare',
}

export type Weakness = {
  multiplier: number;
  type: POKEMON_TYPE;
};

export type Resistance = {
  points: number;
  type: POKEMON_TYPE;
};

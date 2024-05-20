export type UserData = {
  id: string | undefined;
  name: string;
  photoURL: string;
  accessToken: string;
};

export type Configuration = {
  clientId: string | undefined;
  environment: string;
  backendURL: string;
};

export type Weakness = {
  multiplier: number;
  type: POKEMON_TYPE;
};

export type Resistance = {
  points: number;
  type: POKEMON_TYPE;
};

export type PokeCard = {
  id: string;
  name: string;
  hp: number;
  pokemonType: string;
  cardtype: string;
  expansion: string;
  attack: number;
  resistance: Resistance | undefined;
  weakness: Weakness | undefined;
};

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

export type NewCard = {
  userId: string;
  name: string;
  hp: number;
  pokemonType: POKEMON_TYPE;
  cardtype: CARD_TYPE;
  weaknesType: POKEMON_TYPE | undefined;
  weaknessMultiplier: number | undefined;
  resistanceType: POKEMON_TYPE | undefined;
  resistancePoint: number | undefined;
  expansion: string;
  attack: number;
};

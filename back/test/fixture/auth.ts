import { PokeUser } from 'src/auth/entity/pokeUser.entity';

export const pokeEmail: string = 'ash.ketchum@gmail.com';

export const pokeUserFactory = (email: string = pokeEmail): PokeUser => {
  return {
    email: email,
    lastConnection: new Date(),
  };
};

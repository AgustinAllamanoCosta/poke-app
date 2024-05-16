import { PokeUser } from 'src/auth/entity/pokeUser.entity';

export const pokeUserFactory = (
  email: string = 'ash.ketchum@gmail.com',
): PokeUser => {
  return {
    email: email,
    lastConnection: new Date()
  };
};

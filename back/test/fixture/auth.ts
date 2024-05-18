import { RegisterUserDTO } from 'src/auth/RegisterUserDTO';
import { PokeUser } from 'src/auth/entity/pokeUser.entity';

export const pokeEmail: RegisterUserDTO = { email: 'ash.ketchum@gmail.com' };

export const pokeUserFactory = (email: string = pokeEmail.email): PokeUser => {
  return {
    id: 'som-user-id',
    email: email,
    lastConnection: new Date(),
    cards: [],
  };
};

import { RegisterUserDTO } from 'src/auth/RegisterUserDTO';
import { PokeUser } from 'src/auth/entity/pokeUser.entity';
import { v4 as uuidv4 } from 'uuid';

export const pokeEmail: RegisterUserDTO = { email: 'ash.ketchum@gmail.com' };

export const pokeUserFactory = (email: string = pokeEmail.email): PokeUser => {
  return {
    id: uuidv4(),
    email: email,
    lastConnection: new Date(),
    cards: [],
  };
};

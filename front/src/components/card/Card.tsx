import { styled } from 'styled-components';
import { PokeCard } from '../../views/cards/View';

const PokemonCard = (cardData: PokeCard): React.JSX.Element => {
  return (
    <Container>
      <h4>{cardData.name}</h4>
      <span>HP: {cardData.hp}</span>
      <span>Type: {cardData.type}</span>
      <span>Expansion: {cardData.expansion}</span>
      <span>Rarity: {cardData.cardType}</span>
    </Container>
  );
};

const Container = styled.div``;

export default PokemonCard;

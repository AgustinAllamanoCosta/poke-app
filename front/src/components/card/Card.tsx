import { styled } from 'styled-components';
import { PokeCard } from '../../views/cards/View';

type PokemonCradProps ={ cardData: PokeCard, onClick?: ()=>void };  

const PokemonCard = ( { cardData, onClick }: PokemonCradProps ): React.JSX.Element => {
  return (
    <Container onClick={onClick ? onClick : ()=>{}}>
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

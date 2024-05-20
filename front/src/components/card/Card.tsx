import { Card, ListGroup } from 'react-bootstrap';
import { styled } from 'styled-components';
import { PokeCard } from '../../types/types';

type PokemonCradProps = {
  cardData: PokeCard;
  onClick?: () => void;
  imgSrc: string | undefined;
};

const PokemonCard = ({
  cardData,
  onClick,
  imgSrc,
}: PokemonCradProps): React.JSX.Element => {
  const imagePlaceHolder =
    'https://pbs.twimg.com/media/ERPDVqzWAAUwLRl?format=png&name=small';
  return (
    <CardContent onClick={onClick ? onClick : () => {}}>
      <Card.Header>
        <Card.Title>{cardData.name}</Card.Title>
        <Card.Subtitle>HP: {cardData.hp}</Card.Subtitle>
      </Card.Header>
      <Card.Img src={imgSrc ? imgSrc : imagePlaceHolder} />
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>Type {cardData.pokemonType}</ListGroup.Item>
          <ListGroup.Item>Expansion {cardData.expansion}</ListGroup.Item>
          <ListGroup.Item>Rarity {cardData.cardtype}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </CardContent>
  );
};

const CardContent = styled(Card)`
  width: 300px;
  margin: 5px;
  height: 530px;
  border-radius: 14px;
  cursor: pointer;
`;

export default PokemonCard;

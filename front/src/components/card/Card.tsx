import { styled } from 'styled-components';
import { THEME_ONE } from '../../constants/colors';
import { FONTS } from '../../constants/size';
import { PokeCard } from '../../types/types';

type PokemonCradProps = { cardData: PokeCard; onClick?: () => void };

const PokemonCard = ({
  cardData,
  onClick,
}: PokemonCradProps): React.JSX.Element => {
  return (
    <Container onClick={onClick ? onClick : () => {}}>
      <Header>
        <Name>{cardData.name}</Name>
        <div>
          <span>HP: </span>
          <Name>{cardData.hp}</Name>
        </div>
      </Header>
      <Image />
      <Footer>
        <FooterText> Type: {cardData.type}</FooterText>
        <FooterText>Expansion: {cardData.expansion}</FooterText>
        <FooterText>Rarity: {cardData.cardType}</FooterText>
      </Footer>
    </Container>
  );
};

const Name = styled.span`
  font-size: ${FONTS.TITLE};
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 5px;
`;

const Image = styled.img`
  border: solid;
  border-color: black;
  width: 250px;
  height: 200px;
  margin-bottom: 25px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  font-size: ${FONTS.SUB_TITLE};
`;

const FooterText = styled.span`
  margin: 5px;
`;

const Container = styled.div`
    display: flex;
    background-color: ${THEME_ONE.cardBackground};
    flex-direction: column;
    align-items: center;
    padding: 7px;
    margin: 10px;
    border: solid;
    border-radius: 14px;
    width: 300px;
    height: 400px;
    border-color: black;
    cursor: pointer;
}
`;

export default PokemonCard;

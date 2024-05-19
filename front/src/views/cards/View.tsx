import styled from 'styled-components';
import { useContext, useEffect } from 'react';
import { UserInformationContext } from '../../contexts/userContext';
import { ErrorHandlerContext } from '../../contexts/errorHandlerContext';
import { useNavigate } from 'react-router-dom';
import { BATTLE } from '../../constants/routePaths';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import PokemonCard from '../../components/card/Card';
import { useAPI } from '../../hooks/useApi';

export type PokeCard = {
  id: string;
  name: string;
  hp: number;
  type: string;
  cardType: string;
  expansion: string;
  attack: number;
};

type CardsViewProp = {
  selectPokemon: (pokemon:PokeCard)=>void;
};

const CardsView = ({ selectPokemon }:CardsViewProp) => {
  const errorContext = useContext(ErrorHandlerContext);
  const userInformation = useContext(UserInformationContext);
  const navigate = useNavigate();
  const { getUserCards } = useAPI();

  const loadCard = async () => {
    const cards = await getUserCards();
    userInformation.setCards(cards);
  };

  useEffect(() => {
    loadCard();
  }, []);

  const layouts = {
    lg: [
      { i: 'poke-card-1', x: 0, y: 0, w: 1, h: 10 },
      { i: 'poke-card-2', x: 1, y: 0, w: 1, h: 10 },
      { i: 'poke-card-3', x: 2, y: 0, w: 1, h: 10 },
    ],
    md: [
      { i: 'poke-card-1', x: 0, y: 0, w: 1, h: 10 },
      { i: 'poke-card-2', x: 1, y: 0, w: 1, h: 10 },
      { i: 'poke-card-3', x: 2, y: 0, w: 1, h: 10 },
    ],
    sm: [
      { i: 'poke-card-1', x: 0, y: 0, w: 1, h: 10 },
      { i: 'poke-card-2', x: 1, y: 0, w: 1, h: 10 },
      { i: 'poke-card-3', x: 2, y: 0, w: 1, h: 10 },
    ],
    xs: [
      { i: 'poke-card-1', x: 0, y: 0, w: 1, h: 10 },
      { i: 'poke-card-2', x: 1, y: 0, w: 1, h: 10 },
      { i: 'poke-card-3', x: 2, y: 0, w: 1, h: 10 },
    ],
    xxs: [
      { i: 'poke-card-1', x: 0, y: 0, w: 1, h: 10 },
      { i: 'poke-card-2', x: 1, y: 0, w: 1, h: 10 },
      { i: 'poke-card-3', x: 2, y: 0, w: 1, h: 10 },
    ],
  };

  return (
    <Container>
      <TitleBar>
        <SearchInput placeholder="Search by Name" />
        <SearchInput placeholder="Search by Expansion" />
        <SearchInput placeholder="Search by Type" />
      </TitleBar>
      <CardGrid
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      >
        {userInformation.cards.map((cardData: PokeCard, index) => {
          return (
            <PokemonCard
              key={`poke-card-${index + 1}`}
              cardData={cardData}
              onClick={()=>{
                selectPokemon(cardData);
                navigate(BATTLE)
                }}
            />
          );
        })}
      </CardGrid>
    </Container>
  );
};

const TitleBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  height: 40px;
  margin-bottom: 40px;
`;

const SearchInput = styled.input`
  height: 20px;
`;

const CardGrid = styled(ResponsiveGridLayout)``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default CardsView;

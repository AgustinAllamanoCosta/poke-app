import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { UserInformationContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { BATTLE } from '../../constants/routePaths';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import PokemonCard from '../../components/card/Card';
import { useAPI } from '../../hooks/useApi';
import { NavBar } from '../../components/bar/Bar';
import { PokeCard } from '../../types/types';

type CardsViewProp = {
  selectPokemon: (pokemon: PokeCard) => void;
};

const CardsView = ({ selectPokemon }: CardsViewProp) => {
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [nameFilter, setNameFilter] = useState<string | undefined>(undefined);
  const [expansionFilter, setExpansionFilter] = useState<string | undefined>(
    undefined,
  );
  const [displayCards, setDisplayCards] = useState<PokeCard[]>([]);

  const userInformation = useContext(UserInformationContext);
  const navigate = useNavigate();
  const { getUserCards } = useAPI();

  const loadCard = async () => {
    const cards = await getUserCards();
    userInformation.setCards(cards);
    setDisplayCards(cards);
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
    <>
      <NavBar />
      <Container>
        <TitleBar>
          <SearchInput placeholder="Search by Name" />
          <SearchInput placeholder="Search by Expansion" />
          <select
            onChange={(data) => {
              setTypeFilter(data.target.value);
            }}
          >
            <option value="">Select...</option>
            {displayCards.map((card: PokeCard) => {
              return <option value={card.type}>{card.type}</option>;
            })}
          </select>
        </TitleBar>
        {displayCards && (
          <CardGrid
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 1200, sm: 1200, xs: 1200, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          >
            {displayCards.map((cardData: PokeCard, index) => {
              return (
                <PokemonCard
                  key={`poke-card-${index + 1}`}
                  cardData={cardData}
                  onClick={() => {
                    selectPokemon(cardData);
                    navigate(BATTLE);
                  }}
                />
              );
            })}
          </CardGrid>
        )}
      </Container>
    </>
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

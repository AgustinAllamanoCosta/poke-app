import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { UserInformationContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { BATTLE } from '../../constants/routePaths';
import GridLayout from "react-grid-layout";
import PokemonCard from '../../components/card/Card';
import { useAPI } from '../../hooks/useApi';
import { NavBar } from '../../components/bar/Bar';
import { PokeCard } from '../../types/types';

type CardsViewProp = {
  selectPokemon: (pokemon: PokeCard) => void;
};

const CardsView = ({ selectPokemon }: CardsViewProp) => {
  const userInformation = useContext(UserInformationContext);
  const navigate = useNavigate();
  const { getUserCards } = useAPI();

  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [nameFilter, setNameFilter] = useState<string | undefined>(undefined);
  const [expansionFilter, setExpansionFilter] = useState<string | undefined>(
    undefined,
  );
  const [displayCards, setDisplayCards] = useState<PokeCard[]>([]);
  const [layout, setLayout] = useState<GridLayout.Layout[]>([]);

  const pokeCardIdTemplate: string = 'poke-card-';
  const cardPerRow: number = 3;

  const loadCard = async () => {
    const cards = await getUserCards();
    userInformation.setCards(cards);
    setDisplayCards(cards);
  };

  const generateLayout = ()=>{
    const layout: Array<GridLayout.Layout> = [];
    let initX: number = 0;
    let initY: number = 0;

    const cardWidth: number = 1;
    const cardHeight: number = 1;

    displayCards.forEach((pokeCard: PokeCard, index: number)=>{
      const newLayoutConf: GridLayout.Layout = {
        i: `${pokeCardIdTemplate}${index}`,
        x: initX,
        y: initY,
        w: cardWidth,
        h: cardHeight,
      };
      layout.push(newLayoutConf);
      if( initX === 0 || initX/cardWidth < cardPerRow){
          initX+= cardWidth;
      }else{
        initX=0;
        initY+= cardHeight;
      }
    });
    console.debug('new layout', layout);
    return layout;
  };


  useEffect(() => {
    loadCard();
  }, []);

  useEffect(() => {
    if(displayCards.length > 0){
        setLayout(generateLayout());
    }
  }, [displayCards]);

  return (
    <>
      <NavBar />
        <FilterBar>
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
        </FilterBar>
        {displayCards && (
          <GridLayout
          layout={layout}
          rowHeight={425}
          width={1500}
          cols={cardPerRow}
          margin={[0,0]}
          >
            {displayCards.map((cardData: PokeCard, index) => {
              return (
              <div key={`${pokeCardIdTemplate}${index}`}>
                <PokemonCard
                  cardData={cardData}
                  onClick={() => {
                    selectPokemon(cardData);
                    navigate(BATTLE);
                  }}
                />
              </div>
              );
            })}
          </GridLayout>
        )}
    </>
  );
};

const FilterBar = styled.div`
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

export default CardsView;

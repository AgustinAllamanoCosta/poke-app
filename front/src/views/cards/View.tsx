import styled from 'styled-components';
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserInformationContext } from '../../contexts/userContext';
import { googleLogout } from '@react-oauth/google';
import { ErrorHandlerContext } from '../../contexts/errorHandlerContext';
import { useNavigate } from 'react-router-dom';
import { INDEX } from '../../constants/routePaths';
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import { Button } from '../../components/button/Button';
import PokemonCard from '../../components/card/Card';
import axios from 'axios';

export type PokeCard = {
  id:string;
  name:string;
  hp:number;
  type:string;
  cardType:string;
  expansion:string;
  attack:number;
};

const CardsView = () => {
  const errorContext = useContext(ErrorHandlerContext);
  const userInformation = useContext(UserInformationContext);
  const navigate = useNavigate();
  const [userCards, setUserCards] = useState<Array<PokeCard>>([]);

  useEffect(()=>{
    console.log(userInformation.userData);
    axios.get(`http://localhost:3000/cards/user/${userInformation.userData?.id}`, {
      headers: {
        'authorization': `Bearer ${userInformation.userData?.accessToken}`
        }
      }).then((response)=>{
        console.debug('back response', response.data);
        if(response.data){
          setUserCards(response.data);
        }
      }).catch((error)=>{
        console.error(error);
        });
  },[]);

  const logOut = useCallback(() => {
    googleLogout();
    userInformation.setUserData(undefined);
    navigate(INDEX);
  }, [userInformation.userData]);

  const layouts = {
      lg: [
        { i: "poke-card-1", x: 0, y: 0, w: 1, h: 2 },
        { i: "poke-card-2", x: 1, y: 0, w: 1, h: 2 },
        { i: "poke-card-3", x: 2, y: 0, w: 1, h: 2 }
      ],
      md:[
        { i: "poke-card-1", x: 0, y: 0, w: 1, h: 2 },
        { i: "poke-card-2", x: 1, y: 0, w: 1, h: 2 },
        { i: "poke-card-3", x: 2, y: 0, w: 1, h: 2 }
      ],
      sm:[
        { i: "poke-card-1", x: 0, y: 0, w: 1, h: 2 },
        { i: "poke-card-2", x: 1, y: 0, w: 1, h: 2 },
        { i: "poke-card-3", x: 2, y: 0, w: 1, h: 2 }
      ],
      xs:[
        { i: "poke-card-1", x: 0, y: 0, w: 1, h: 2 },
        { i: "poke-card-2", x: 1, y: 0, w: 1, h: 2 },
        { i: "poke-card-3", x: 2, y: 0, w: 1, h: 2 }
      ],
      xxs:[
        { i: "poke-card-1", x: 0, y: 0, w: 1, h: 2 },
        { i: "poke-card-2", x: 1, y: 0, w: 1, h: 2 },
        { i: "poke-card-3", x: 2, y: 0, w: 1, h: 2 }
      ]
    };

  return <Container>
    <TitleBar>
      <h2> Pokemon App</h2>
      <SearchInput placeholder='Search by Name'/>
      <SearchInput placeholder='Search by Expansion'/>
      <Button text='Logout' onClick={logOut} />
    </TitleBar>
    <CardGrid
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
    >{
        userCards.map((cardData:PokeCard, index)=>{
          return <PokemonCard key={`poke-card-${index+1}`} {...cardData} />
        })
      }
    </CardGrid>
  </Container>;
};

const TitleBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  height: 40px;
`;

const SearchInput = styled.input`
  height: 20px;
`;

const Card = styled.div``;

const CardGrid = styled(ResponsiveGridLayout)``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export default CardsView;

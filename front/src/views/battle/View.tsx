import styled from 'styled-components';
import { useCallback, useContext } from 'react';
import { UserInformationContext } from '../../contexts/userContext';
import { googleLogout } from '@react-oauth/google';
import { ErrorHandlerContext } from '../../contexts/errorHandlerContext';
import { useNavigate } from 'react-router-dom';
import { INDEX } from '../../constants/routePaths';
import { PokeCard } from '../cards/View';
import PokemonCard from '../../components/card/Card';
import { Button } from '../../components/button/Button';

type BattleViewProps = {
  pokemonCard: PokeCard | undefined
};

const BattleView = ( { pokemonCard }: BattleViewProps) => {
  const errorContext = useContext(ErrorHandlerContext);
  const userInformation = useContext(UserInformationContext);
  const navigate = useNavigate();

  const logOut = useCallback(() => {
    googleLogout();
    userInformation.setUserData(undefined);
    navigate(INDEX);
  }, [userInformation.userData]);

  return <Container>
  { pokemonCard ? <> 
    <h3>{pokemonCard.name}</h3>
    <PokemonCard cardData={ pokemonCard} />
    <span>VS</span>
    <span>Battle with</span>
    <Button text='Battle!!' onClick={()=>{}} />
    </> : <span>SELECT A POKEMON FIRTS</span>
  }
  </Container>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export default BattleView;

import styled from 'styled-components';
import { PokeCard } from '../cards/View';
import PokemonCard from '../../components/card/Card';
import { Button } from '../../components/button/Button';
import { useAPI } from '../../hooks/useApi';
import { useContext, useEffect, useState } from 'react';
import { UserInformationContext } from '../../contexts/userContext';

type BattleViewProps = {
  pokemonCard: PokeCard | undefined
};

const BattleView = ( { pokemonCard }: BattleViewProps) => {

  const { battle } = useAPI();
  const userInformation = useContext(UserInformationContext);
  const [ result, setResult ] = useState();
  const [ rivalName, setRivalName] = useState<string | null>(null);

  const getBattleResult = async ()=>{
    if(pokemonCard?.id && rivalName && rivalName != ""){
      const battleResult = await battle(pokemonCard.id,rivalName);
      setResult(battleResult);
    }
  };

  useEffect(()=>{
    console.log(result);
  },[result]);

  return <Container>
  { pokemonCard ? <>
    <h3>{pokemonCard.name}</h3>
    <PokemonCard cardData={ pokemonCard} />
    <span>VS</span>
    <span>Battle with</span>
     <select onChange={(data)=>{ setRivalName(data.target.value) }}>
        <option value="" >Select...</option>
        {userInformation.cards.map((card: PokeCard)=>{
              return (<option value={card.name}>{card.name}</option>);
        })}
      </select>
    <Button text='Battle!!' onClick={getBattleResult} />
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

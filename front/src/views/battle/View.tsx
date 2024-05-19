import styled from 'styled-components';
import PokemonCard from '../../components/card/Card';
import { Button } from '../../components/button/Button';
import { useAPI } from '../../hooks/useApi';
import { useContext, useEffect, useState } from 'react';
import { UserInformationContext } from '../../contexts/userContext';
import { FONTS } from '../../constants/size';
import { NavBar } from '../../components/bar/Bar';
import { PokeCard } from '../../types/types';

type BattleViewProps = {
  pokemonCard: PokeCard | undefined;
};

const BattleView = ({ pokemonCard }: BattleViewProps) => {
  const { battle } = useAPI();
  const userInformation = useContext(UserInformationContext);
  const [result, setResult] = useState<boolean | undefined>(undefined);
  const [rivalName, setRivalName] = useState<string | null>(null);

  const getBattleResult = async () => {
    if (pokemonCard?.id && rivalName && rivalName != '') {
      const battleResult = await battle(pokemonCard.id, rivalName);
      setResult(battleResult.challengerDefeatRival);
    }
  };

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <>
      <NavBar />
      <Container>
        {pokemonCard && (
          <>
            <Header>
              <h1>{pokemonCard.name}</h1>
            </Header>
            <Body>
              <PokemonCard cardData={pokemonCard} />
              <VsText>VS</VsText>
              <Options>
                <h1>Battle with</h1>
                <select
                  onChange={(data) => {
                    setRivalName(data.target.value);
                  }}
                >
                  <option value="">Select...</option>
                  {userInformation.cards.map((card: PokeCard) => {
                    return <option value={card.name}>{card.name}</option>;
                  })}
                </select>
                <Button
                  text="Battle!!"
                  onClick={getBattleResult}
                />
              </Options>
            </Body>
            { result != undefined && <ResultTag result={result} >{result ? 'Success' : 'Fail'}</ResultTag> }
          </>
        )}
      </Container>
    </>
  );
};

const ResultTag = styled.span<{ result:boolean | undefined }>`
    font-size:${FONTS.SUB_TITLE};
    background-color: ${ (props)=>( props.result ? 'Green' : 'Red') };
    width: 100px;
    display:flex;
    justify-content: center;
    border-radius: 10px;
    margin: 10px;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  padding-left: 10px;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

const VsText = styled.span`
  font-size: ${FONTS.TITLE};
  margin: 40px;
`;

const Body = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export default BattleView;

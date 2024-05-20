import styled from 'styled-components';
import PokemonCard from '../../components/card/Card';
import { useAPI } from '../../hooks/useApi';
import { useContext, useEffect, useState } from 'react';
import { UserInformationContext } from '../../contexts/userContext';
import { FONTS } from '../../constants/size';
import { NavBar } from '../../components/bar/Bar';
import { PokeCard } from '../../types/types';
import { Alert, Button, Card, Form } from 'react-bootstrap';

type BattleViewProps = {
  pokemonCard: PokeCard | undefined;
};

const BattleView = ({ pokemonCard }: BattleViewProps) => {
  const { battle } = useAPI();
  const userInformation = useContext(UserInformationContext);
  const [result, setResult] = useState<boolean | undefined>(undefined);
  const [rivalName, setRivalName] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const getBattleResult = async () => {
    if (pokemonCard?.id && rivalName && rivalName != '') {
      const battleResult = await battle(pokemonCard.id, rivalName);
      setResult(battleResult.challengerDefeatRival);
      setShowResult(true);
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
              <PokemonCard
                cardData={pokemonCard}
                imgSrc={undefined}
              />
              <VsText>VS</VsText>
              <CardContent>
                <Card.Header style={{ height: '65px' }}>
                  <Card.Title>Battle against</Card.Title>
                </Card.Header>
                <Card.Img
                  src={
                    'https://pbs.twimg.com/media/ERPDVqzWAAUwLRl?format=png&name=small'
                  }
                />
                <Card.Body>
                  <Form.Group
                    className="mb-3"
                    controlId="pokemonType"
                  >
                    <Form.Select
                      onChange={(data) => {
                        setShowResult(false);
                        setRivalName(data.target.value);
                      }}
                    >
                      <option
                        key={`firts-option`}
                        value={undefined}
                      >
                        Select...
                      </option>
                      {userInformation.cards.map((card: PokeCard, index) => {
                        return (
                          <option
                            key={`${card.name}-${index}`}
                            value={card.name}
                          >
                            {card.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Card.Body>
                <ButtonContainer>
                  <Button onClick={getBattleResult}>Battle!!</Button>
                </ButtonContainer>
              </CardContent>
            </Body>
            {showResult && (
              <Alert
                variant={result == true ? 'success' : 'danger'}
                onClose={() => setShowResult(false)}
                dismissible
              >
                <Alert.Heading>
                  {pokemonCard.name} {result == false && 'not'} defeat{' '}
                  {rivalName}
                </Alert.Heading>
              </Alert>
            )}
          </>
        )}
      </Container>
    </>
  );
};

const ButtonContainer = styled(Card.Footer)`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const CardContent = styled(Card)`
  width: 300px;
  margin: 5px;
  height: 530px;
  border-radius: 14px;
  cursor: pointer;
  display: flex;
`;

const Body = styled.div`
  display: flex;
  flex-direction: row;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const VsText = styled.span`
  font-size: ${FONTS.TITLE};
  margin: 40px;
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

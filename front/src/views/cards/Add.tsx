import styled from 'styled-components';
import { useContext, useState } from 'react';
import { UserInformationContext } from '../../contexts/userContext';
import { useAPI } from '../../hooks/useApi';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NavBar } from '../../components/bar/Bar';
import { CARD_TYPE, NewCard, POKEMON_TYPE } from '../../types/types';
import { Alert, Button, Card, CardBody, Col, Form, Row } from 'react-bootstrap';

const AddCardsView = () => {
  const userInformation = useContext(UserInformationContext);
  const { addNewCard } = useAPI();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCard>();

  const [showResult, setShowResult] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(false);

  const onAdd: SubmitHandler<NewCard> = async (data) => {
    if (userInformation.userData?.id) {
      data.userId = userInformation.userData.id;
    }
    if ((data.weaknesType as string) == 'Select...') {
      data.weaknesType = undefined;
      data.weaknessMultiplier = undefined;
    }
    if ((data.resistanceType as string) == 'Select...') {
      data.resistanceType = undefined;
      data.resistancePoint = undefined;
    }
    const result = await addNewCard(data);
    setShowResult(true);
    setResult(result === 200 || result === 201);
  };

  return (
    <>
      <NavBar />
      {showResult && (
        <Alert
          variant={result == true ? 'success' : 'danger'}
          onClose={() => setShowResult(false)}
          dismissible
        >
          <Alert.Heading>
            Card {result === true ? 'successfully' : 'faild'}
          </Alert.Heading>
        </Alert>
      )}
      <Container>
        <Card style={{ width: '500px', margin: '10px' }}>
          <Card.Header>New Pokemon</Card.Header>
          <Form onSubmit={handleSubmit(onAdd)}>
            <CardBody>
              <Container>
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="pokemonName"
                    >
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Pikachu"
                        {...register('name', { required: true })}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="pokemonHP"
                    >
                      <Form.Label>HP Points</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="60"
                        {...register('hp', {
                          required: true,
                          valueAsNumber: true,
                        })}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="pokemonType"
                    >
                      <Form.Label>Type</Form.Label>
                      <Form.Select
                        {...register('pokemonType', { required: true })}
                      >
                        <option
                          key={`firts-option`}
                          value={undefined}
                        >
                          Select...
                        </option>
                        {Object.values(POKEMON_TYPE).map((value: string) => (
                          <option
                            key={value}
                            value={value}
                          >
                            {value}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="pokemonCardType"
                    >
                      <Form.Label>Card Type</Form.Label>
                      <Form.Select
                        {...register('cardtype', { required: true })}
                      >
                        <option
                          key={`firts-option`}
                          value={undefined}
                        >
                          Select...
                        </option>
                        {Object.values(CARD_TYPE).map((value: string) => (
                          <option
                            key={value}
                            value={value}
                          >
                            {value}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="pokemonAttack"
                    >
                      <Form.Label>BaseAttack</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="0"
                        {...register('attack', {
                          required: true,
                          valueAsNumber: true,
                        })}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="pokemonWeaknessType"
                    >
                      <Form.Label>Weakness to</Form.Label>
                      <Form.Select
                        {...register('weaknesType', { required: false })}
                      >
                        <option
                          key={`firts-option`}
                          value={undefined}
                        >
                          Select...
                        </option>
                        {Object.values(POKEMON_TYPE).map((value: string) => (
                          <option
                            key={value}
                            value={value}
                          >
                            {value}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="pokemonWeakMulti"
                    >
                      <Form.Label>Multipier</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="0"
                        {...register('weaknessMultiplier', {
                          required: false,
                          valueAsNumber: true,
                        })}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="pokemonResistance"
                    >
                      <Form.Label>Resistance to</Form.Label>
                      <Form.Select
                        {...register('resistanceType', { required: false })}
                      >
                        <option
                          key={`firts-option`}
                          value={undefined}
                        >
                          Select...
                        </option>
                        {Object.values(POKEMON_TYPE).map((value: string) => (
                          <option
                            key={value}
                            value={value}
                          >
                            {value}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="pokemonResistancePoint"
                    >
                      <Form.Label>Point</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="0"
                        {...register('resistancePoint', {
                          required: false,
                          valueAsNumber: true,
                        })}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="pokemonExpansion"
                    >
                      <Form.Label>Expansion</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Jungle"
                        {...register('expansion', { required: true })}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Container>
            </CardBody>
            <ButtonContainer>
              <Button type={'submit'}>Add</Button>
            </ButtonContainer>
          </Form>
        </Card>
      </Container>
    </>
  );
};

const ButtonContainer = styled(Card.Footer)`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default AddCardsView;

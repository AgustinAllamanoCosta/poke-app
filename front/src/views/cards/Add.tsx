import styled from 'styled-components';
import { useContext } from 'react';
import { UserInformationContext } from '../../contexts/userContext';
import { useAPI } from '../../hooks/useApi';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NavBar } from '../../components/bar/Bar';
import { CARD_TYPE, NewCard, POKEMON_TYPE } from '../../types/types';
import { Button, Card, CardBody, Form } from 'react-bootstrap';

const AddCardsView = () => {
  const userInformation = useContext(UserInformationContext);
  const { addNewCard } = useAPI();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCard>();

  const onAdd: SubmitHandler<NewCard> = async (data) => {
    console.debug('add button clicked');
    if (userInformation.userData?.id) {
      data.userId = userInformation.userData.id;
    }
    if ((data.weaknesType as string) == '') {
      data.weaknesType = undefined;
      data.weaknessMultiplier = undefined;
    }
    if ((data.resistanceType as string) == '') {
      data.resistanceType = undefined;
      data.resistancePoint = undefined;
    }
    await addNewCard(data);
  };

  return (
    <>
      <NavBar />
      <Container>
        <Card style={{ width: '500px', margin: '10px' }}>
          <Card.Header>New Pokemon</Card.Header>
          <CardBody>
            <Form onSubmit={handleSubmit(onAdd)}>

              <Form.Group className="mb-3" controlId="pokemonName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Pikachu"
                  {...register('name', { required: true })}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="pokemonHP">
                <Form.Label>HP Points</Form.Label>
                <Form.Control type="number" placeholder="60"
                  {...register('hp', { required: true, valueAsNumber: true })} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="pokemonType" >
                <Form.Label>Type</Form.Label>
                <Form.Select {...register('pokemonType', { required: true })}>
                  <option key={`firts-option`} value={undefined} >
                    Select...
                  </option>
                  {Object.values(POKEMON_TYPE).map((value: string) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="pokemonCardType">
                <Form.Label>Card Type</Form.Label>
                <Form.Select {...register('cardtype', { required: true })}>
                  <option key={`firts-option`} value={undefined}>
                    Select...
                  </option>
                  {Object.values(CARD_TYPE).map((value: string) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="pokemonWeaknessType">
                <Form.Label>Weakness to</Form.Label>
                <Form.Select {...register('weaknesType', { required: false })}>
                  <option key={`firts-option`} value={undefined}>
                    Select...
                  </option>
                  {Object.values(POKEMON_TYPE).map((value: string) => (
                    <option key={value} value={value}>
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
                  ;
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
                  placeholder=".."
                  {...register('expansion', { required: true })}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="pokemonAttack"
              >
                <Form.Label>BaseAttack</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0"
                  {...register('expansion', {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </Form.Group>
              <Button type={'submit'}>
                Add
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default AddCardsView;

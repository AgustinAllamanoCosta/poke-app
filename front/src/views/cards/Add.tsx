import styled from 'styled-components';
import { useContext } from 'react';
import { UserInformationContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { useAPI } from '../../hooks/useApi';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NavBar } from '../../components/bar/Bar';
import { CARD_TYPE, NewCard, POKEMON_TYPE } from '../../types/types';

const AddCardsView = () => {
  const userInformation = useContext(UserInformationContext);
  const navigate = useNavigate();
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
    if(data.weaknesType as string == ""){
      data.weaknesType = undefined;
      data.weaknessMultiplier = undefined;
    }
    if(data.resistanceType as string == ""){
      data.resistanceType = undefined;
      data.resistancePoint = undefined;
    }
    await addNewCard(data);
  };

  return (
    <>
      <NavBar />
      <BodyContainer>
        <FormCard>
        <h2>New Pokemon</h2>
        <Form onSubmit={handleSubmit(onAdd)}>
          <span>Name</span>
          <Inputs
            defaultValue="Name"
            {...register('name', { required: true })}
          />
          <span>HP</span>
          <Inputs
            defaultValue="0"
            {...register('hp', { required: true, valueAsNumber: true })}
          />
          <span>Type</span>
          <Select {...register('pokemonType', { required: true })}>
            <option value="">Select...</option>
            {Object.values(POKEMON_TYPE).map((value: string) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
          <span>Card Type</span>
          <Select {...register('cardtype', { required: true })}>
            <option value="">Select...</option>
            {Object.values(CARD_TYPE).map((value: string) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
          <span>Weakness to</span>
          <Select {...register('weaknesType')}>
            <option value="">Select...</option>
            {Object.values(POKEMON_TYPE).map((value: string) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
          <span>Weakness Multiplier</span>
          <Inputs
            defaultValue="0"
            {...register('weaknessMultiplier', { valueAsNumber: true })}
          />
          <span>Resistance to</span>
          <Select {...register('resistanceType')}>
            <option value="">Select...</option>
            {Object.values(POKEMON_TYPE).map((value: string) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
          <span>Resistance Point</span>
          <Inputs
            defaultValue="0"
            {...register('resistancePoint', { valueAsNumber: true })}
          />
          <span>Expansion</span>
          <Inputs
            defaultValue="expansion"
            {...register('expansion', { required: true, value: undefined })}
          />
          <span>Base Attack</span>
          <Inputs
            defaultValue="0"
            {...register('attack', { required: true, valueAsNumber: true })}
          />
          <Inputs type={'submit'} />
        </Form>
        </FormCard>
      </BodyContainer>
    </>
  );
};

const FormCard = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #645AA3;
  width: 300px;
  padding: 5px;
  border-radius: 10px;
`;

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Inputs = styled.input`
  margin: 5px;
  height: 30px;
  width: 200px;
  border-radius: 10px;
`;

const Select = styled.select`
  margin: 5px;
  height: 30px;
  width: 200px;
  border-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export default AddCardsView;

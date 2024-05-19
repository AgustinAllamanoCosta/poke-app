import styled from 'styled-components';
import { useCallback, useContext, useState } from 'react';
import { UserInformationContext } from '../../contexts/userContext';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { INDEX } from '../../constants/routePaths';
import { useAPI } from '../../hooks/useApi';
import { useForm, SubmitHandler } from "react-hook-form"

export enum POKEMON_TYPE {
  ELECTRIC = 'Electric',
}
export enum CARD_TYPE {
  COMMON = 'Common',
}

export type NewCard = {
  userId: string,
  name: string,
  hp: number,
  pokemonType: POKEMON_TYPE,
  cardtype: CARD_TYPE,
  weaknesType: POKEMON_TYPE,
  weaknessMultiplier: number,
  resistanceType: POKEMON_TYPE,
  resistancePoint: number,
  expansion: string,
  attack: number,
}

const AddCardsView = () => {
  const userInformation = useContext(UserInformationContext);
  const navigate = useNavigate();
  const { addNewCard } = useAPI();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCard>()

  const logOut = useCallback(() => {
    googleLogout();
    userInformation.setUserData(undefined);
    navigate(INDEX);
  }, [userInformation.userData]);


  const onAdd: SubmitHandler<NewCard> = async (data)=>{
    if(userInformation.userData?.id){
      data.userId = userInformation.userData.id;
    }
   await addNewCard(data);
  };

  return (
    <Container onSubmit={handleSubmit(onAdd)} >
    <form>
      <input defaultValue="Name" {...register("name",{ required: true })} />
      <input defaultValue="0" {...register("hp",{ required: true })} />
      <select {...register("pokemonType", { required: true })}>
        <option value="">Select...</option>
        <option value="A">Option A</option>
        <option value="B">Option B</option>
      </select>
      <select {...register("cardtype", { required: true })}>
        <option value="">Select...</option>
        <option value="A">Option A</option>
        <option value="B">Option B</option>
      </select>
      <select {...register("weaknesType")}>
        <option value="">Select...</option>
        <option value="A">Option A</option>
        <option value="B">Option B</option>
      </select>
      <input defaultValue="0" {...register("weaknessMultiplier")} />
      <select {...register("resistanceType")}>
        <option value="">Select...</option>
        <option value="A">Option A</option>
        <option value="B">Option B</option>
      </select>
      <input defaultValue="0" {...register("resistancePoint")} />
      <input defaultValue="expansion" {...register("expansion", { required: true })} />
      <input defaultValue="0" {...register("attack",{ required: true })} />
      <input type={'submit'} />
    </form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export default AddCardsView;

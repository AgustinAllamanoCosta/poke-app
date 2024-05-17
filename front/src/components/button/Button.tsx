import { memo } from 'react';
import { styled } from 'styled-components';
import { FONTS } from '../../constants/size';
import { THEME_ONE } from '../../constants/colors';

export type ButtonProps = {
  text: string;
  onClick: (e: any) => void;
};

export const Button = memo(
  ({ text, onClick }: ButtonProps): React.JSX.Element => {
    return (
      <ButtonContainer
        data-cy={`button-${text}`}
        onClick={onClick}
      >
        <ButtonText data-cy="button-text">{text}</ButtonText>
      </ButtonContainer>
    );
  },
);

const ButtonContainer = styled.div`
  display: inline-flex;
  width: auto;
  flex-direction: row;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-bottom-style: solid;
  border-bottom-color: ${THEME_ONE.boder};
  border-bottom-width: 1px;
  cursor: pointer;
  font-weight: bold;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.span`
  font-size: ${FONTS.TEXT};
`;

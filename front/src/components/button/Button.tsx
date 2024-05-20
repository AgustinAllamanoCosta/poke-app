import { memo } from 'react';
import { Button } from 'react-bootstrap';

export type ButtonProps = {
  text: string;
  onClick: (e: any) => void;
};

export const PokeButton = memo(
  ({ text, onClick }: ButtonProps): React.JSX.Element => {
    return (
      <Button
        data-cy={`button-${text}`}
        onClick={onClick}
        variant={'outline-light'}
        className={'mx-2'}
      >
        {text}
      </Button>
    );
  },
);

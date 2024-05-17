import { styled } from 'styled-components';
import { FONTS } from '../../constants/size';
import { REPO_URL } from '../../constants/routePaths';
import { THEME_ONE } from '../../constants/colors';
import { useGoogleLoginActions } from '../../hooks/useGoogleLogin';
import { CARDS } from '../../constants/routePaths';
import { Button } from '../../components/button/Button';

const LoginView = () => {
  const { loginGoogle } = useGoogleLoginActions(CARDS);

  return (
    <Container>
      <LoginCardContainer>
          <Title
            href={REPO_URL}
            target={'_blank'}
            data-cy="Login-Title"
          >
            Pokemo Battle Cards
          </Title>
          <ButtonContent>
            <Button
              text="Login With Google"
              onClick={loginGoogle}
            />
          </ButtonContent>
      </LoginCardContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const LoginCardContainer = styled.div`
  width: 43vh;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
`;

const Title = styled.a`
  font-weight: bold;
  text-decoration: none;
  color: ${THEME_ONE.fontColor};
  font-size: ${FONTS.TITLE};
`;

export default LoginView;

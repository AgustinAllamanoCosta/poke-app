import { useGoogleLoginActions } from '../../hooks/useGoogleLogin';
import { CARDS } from '../../constants/routePaths';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { THEME_ONE } from '../../constants/colors';

const LoginView = () => {
  const { loginGoogle } = useGoogleLoginActions(CARDS);

  return (
    <Container className="d-flex vh-100">
      <Row className=" m-auto align-self-center ">
        <Col>
          <Card
            className="d-flex align-items-center mb-5"
            style={{ width: '20rem', height: '15rem' }}
          >
            <Card.Header style={{ width: '100%' }}>
              <Card.Title> Login </Card.Title>
              <Card.Subtitle>Pokemo Battle Cards</Card.Subtitle>
            </Card.Header>
            <Card.Body
              className="d-flex align-items-center"
              style={{ height: '100%' }}
            >
              <Button
                style={{ backgroundColor: THEME_ONE.cardBackground }}
                onClick={() => {
                  loginGoogle();
                }}
              >
                Login with Google{' '}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginView;

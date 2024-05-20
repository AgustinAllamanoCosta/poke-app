import { useGoogleLoginActions } from '../../hooks/useGoogleLogin';
import { CARDS } from '../../constants/routePaths';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { THEME_ONE } from '../../constants/colors';

const LoginView = () => {
  const { loginGoogle } = useGoogleLoginActions(CARDS);

  return (
    <Container className="d-flex vh-100">
      <Row className="m-auto align-self-center ">
      <Col>
      <Card className=' align-items-center'>
        <Card.Header>
        <Card.Title>
          Pokemo Battle Cards
        </Card.Title>
        </Card.Header>
        <Card.Body>
          <Button
            style={{ backgroundColor: THEME_ONE.cardBackground }}
            onClick={()=>{loginGoogle()}}
          >Login with Google </Button>
        </Card.Body>
      </Card>
      </Col>
      </Row>
    </Container>
  );
};

export default LoginView;

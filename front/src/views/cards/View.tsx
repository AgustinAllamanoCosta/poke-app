import { useContext, useEffect, useState } from 'react';
import { UserInformationContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { useAPI } from '../../hooks/useApi';
import { NavBar } from '../../components/bar/Bar';
import { PokeCard } from '../../types/types';
import { Form, FloatingLabel, Container, Row, Col } from 'react-bootstrap';
import PokemonCard from '../../components/card/Card';
import { BATTLE } from '../../constants/routePaths';

type CardsViewProp = {
  selectPokemon: (pokemon: PokeCard) => void;
};

const CardsView = ({ selectPokemon }: CardsViewProp) => {
  const userInformation = useContext(UserInformationContext);
  const navigate = useNavigate();
  const { getUserCards } = useAPI();

  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [nameFilter, setNameFilter] = useState<string | undefined>(undefined);
  const [expansionFilter, setExpansionFilter] = useState<string | undefined>(
    undefined,
  );
  const [displayCards, setDisplayCards] = useState<PokeCard[]>([]);

  const loadCard = async () => {
    const cards = await getUserCards();
    userInformation.setCards(cards);
    setDisplayCards(cards);
  };

  useEffect(() => {
    loadCard();
  }, []);

  useEffect(() => {
    let filterCards: PokeCard[] = displayCards;
    if (typeFilter) {
      filterCards = displayCards.filter((card: PokeCard) => {
        const pokeType: string = card.cardtype.toLowerCase();
        return pokeType == typeFilter.toLowerCase();
      });
    }

    if (nameFilter) {
      filterCards = displayCards.filter((card: PokeCard) => {
        const pokeName: string = card.name.toLowerCase();
        return pokeName.includes(nameFilter.toLowerCase());
      });
    }

    if (expansionFilter) {
      filterCards = displayCards.filter((card: PokeCard) => {
        const pokeExpansion: string = card.expansion.toLowerCase();
        return pokeExpansion.includes(expansionFilter.toLowerCase());
      });
    }

    if (
      (!nameFilter || nameFilter == '') &&
      (!expansionFilter || expansionFilter == '') &&
      (typeFilter == 'Select...' || !typeFilter)
    ) {
      setDisplayCards(userInformation.cards);
      return;
    }

    setDisplayCards(filterCards);
  }, [nameFilter, expansionFilter, typeFilter]);

  return (
    <>
      <NavBar />
      <Form>
        <Form.Group className="py-3">
          <Container>
            <Row>
              <Col lg={true}>
                <FloatingLabel
                  controlId="floatingName"
                  label="Filter by Name"
                  className="mb-1 text-body-tertiary"
                >
                  <Form.Control
                    type="text"
                    placeholder="Filter by Name"
                    onChange={(data) => {
                      setNameFilter(data.target.value);
                    }}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingExpansion"
                  label="Filter by Expansion"
                  className="mb-1 text-body-tertiary"
                >
                  <Form.Control
                    type="text"
                    placeholder="Filter by Expansion"
                    onChange={(data) => {
                      setExpansionFilter(data.target.value);
                    }}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingCardtype"
                  label="Filter by Rarity"
                  className="mb-1 text-body-tertiary"
                >
                  <Form.Select
                    onChange={(data) => {
                      setTypeFilter(data.target.value);
                    }}
                  >
                    <option
                      key={`firts-option`}
                      value={undefined}
                    >
                      Select...
                    </option>
                    ;
                    {userInformation.cards.map(
                      (card: PokeCard, index: number) => {
                        return (
                          <option
                            key={`${card.name}-${index}`}
                            value={card.cardtype}
                          >
                            {card.cardtype}
                          </option>
                        );
                      },
                    )}
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
          </Container>
        </Form.Group>
      </Form>
      <Container>
        <Row
          xs={1}
          md={2}
          lg={3}
          xxl={4}
        >
          {displayCards.map((pokeCard: PokeCard, index: number) => {
            return (
              <Col
                lg={true}
                key={`${pokeCard.name}-${index}`}
              >
                <PokemonCard
                  key={`${pokeCard.name}-${index}`}
                  imgSrc={undefined}
                  cardData={pokeCard}
                  onClick={() => {
                    selectPokemon(pokeCard);
                    navigate(BATTLE);
                  }}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default CardsView;

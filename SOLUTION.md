# Pokemon App

## What does this repository contain?

Solution to the Pokémon challenge for Cookunity, consisting of a React app (React 18, StyledComponents, Jest, Bootstrap, and Axios) integrated with a backend built in Nestjs (Nestjs, TypeORM, Jest, Swagger, SuperTest, Dockerode). It is hosted at poke.agustinallamanocosta.com and pokeback.agustinallamanocosta.com:8080/api to access the Swagger documentation.

## Backend

### Infrastructure

For the infrastructure development, I used Google Cloud VM to host the backend with the PostgreSQL database. Both are dockerized and there is a docker-compose file that describes the configuration. To configure the backend, I created some Terraform files that describe all the necessary configuration to create the resources in Google Cloud. This IaC file, with the credentials correctly configured, is capable of reproducing all the infrastructure needed to deploy the backend.

### Backend CI/CD:

For the backend CI/CD, I use GitHub Actions. It handles installing dependencies and caching them, running the linter, running unit tests, generating the production build, and deploying it to the Google Cloud VM.

### Environment Management:

For environment variable management, I opted to use Dotenv Vault, which allows me to have an agnostic configuration variables repository. It works in conjunction with my dependency manager (yarn) and, in case of migrating from one CI/CD platform to another (Jenkins, CircleCI, GitLab, etc.), I can migrate it without major changes. Note that only "business" environment variables are stored in this vault, not those related to pipeline configuration.

### Why this stack for the backend?

Given the simplicity of the app at this moment, but knowing it could become more complex in the future, I believe this stack allows me to make modifications quickly, testably, and easily without worrying about increasing code complexity while maintaining performance.

### Solution:

The presented problem consists of an API capable of performing CRUD operations on Pokémon cards, in addition to simulating a battle between two cards. For the CRUD part, I opted for a Rest API that allows performing all operations (PUT, PATCH, DELETE, GET), along with an endpoint to get cards related to a specific card by type of weakness and resistance. The cards are composed of the following:

```
{
  id: uuid,
  name: string,
  hp: number,
  pokemonType: POKEMON_TYPE,
  cardType: CARD_TYPE,
  weaknessType: POKEMON_TYPE,
  weaknessMultiplier: number,
  resistanceType: POKEMON_TYPE,
  resistancePoint: number,
  expansion: string,
  attack: number
}
```
The idea is that each card is unique in the app. This means that a single card can be shared by many users and that many users can have the same card (creating a ManyToMany relationship, which can be seen in the database entities). This would prevent the database from losing its normalization. Users are authenticated by the frontend, they register in the backend through the /register endpoint, which returns a user ID. If the user exists, it returns the existing ID; otherwise, it creates a new one. That ID is used by the frontend to execute operations with the cards in the backend. In my assumptions, a card is unique if it has the same name, type, and expansion. This means that when creating a card, it first searches the database by these fields before creating a new card.

### Battle:

To solve the battle, I first thought of creating an inheritance system of card types and applying a strategy pattern. The idea is that each type of card has a strategy to know how to battle against another type of card. But then I decided not to do it. First, it is very complex and doesn't add much to the current battle system. Second, I preferred to have all the battle logic in one service, so in case of necessity, I would know quickly where to look to make modifications.

### Testing:

Although I would like to add more tests to the app, I left a couple of tests that I believe are necessary to create a safe test harness for refactoring.

Unit tests per module, validating the controller and service execution.
Integration tests with a tool to help create external dependencies, in this case, Dockerode to create PostgreSQL databases in a Docker container.

## Frontend

### Infrastructure

For the frontend, I opted to use Firebase Hosting because it is easy and quick to configure with my Gmail account :D

### Frontend CI/CD:

Like the backend, the frontend pipeline installs/caches dependencies, validates the linter, and performs the build/deployment, but does not run tests. I didn't manage to add them to the pipeline :(

### Environment Management:

Same as the backend, Dotenv Vault.

### Testing:

Given the simplicity of the screens and components, I decided that the best option is to have snapshot tests to validate styles and integration tests with Cypress for more complex tests.

### Why this stack for the frontend?

Given the simplicity of the front, I didn't see the need to add any framework that would increase the complexity of the entire app.

### Solution:

The problem presented is to build a website where Pokémon cards can be viewed and searched. To later simulate a battle between two cards. To achieve this, I opted to use React with Bootstrap to create a responsive UI, focusing on good usability practices. Additionally, I added another view to load new cards. The frontend has a login that authenticates with a Gmail user to validate access to the app.

## Other features:

* All backend DTOs have basic validations on the fields.
* The backend has integration tests.
* The frontend has filters for the card view.

## Things that are not 100%:

* Login: the frontend has Google login, but I couldn't complete the token authentication against the backend.
* Frontend styles: I missed adding some animations and showing some backend results to improve the experience.
* Images: I couldn't save images in the backend for the cards.
* Frontend testing: I intended to use Cypress for more complete tests and not just snapshot tests.

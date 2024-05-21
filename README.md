# POKEMON APP

## Challenge for CookUnity Interview

## Dependencies:

* Docker
* Docker-Compose
* Yarn o NPM

## Instruction to run the App in local mode:

To launch the app, you first need to generate the corresponding .env files in each subdirectory, then install the dependencies, build each of the apps (back/front), and execute the docker-compose file located in the root of the repository.

## FRONT

inside the front folder

create .env with:

```
VITE_BACK_URL="http://localhost:8081"
VITE_CLIENT_ID="646052871871-q384tfipbd4634bgfchva188d1cmi29b.apps.googleusercontent.com"
```

and run


NPM

```
npm run docker:build
```

YARN

```
yarn docker:build
```

## BACK

inside the back folder

create .env with:

```
app_environment="LOCAL"
POSTGRES_PASSWORD=‘admin’
POSTGRES_USER=‘admin’
POSTGRES_DB='poke-db'
POSTGRES_HOST='localhost'
POSTGRES_PORT=5432
AUTH=0
OAUTH_CLIENT=''
```

and run

NPM

```
npm run docker:build
```

YARN

```
yarn docker:build
```

## Root folder

run

```
docker-compose up
```
## URL Prod:

## https://poke.agustinallamanocosta.com/

## Backend documentation

## https://pokeback.agustinallamanocosta.com:8080/api#/

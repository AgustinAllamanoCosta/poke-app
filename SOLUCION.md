# Pokemon App

## ¿Qué contiene este repositorio?

Solución al challenge de Pokémon para Cookunity, el mismo consiste en una app React (React 18, StyledComponents, Jest, Bootstrap y Axios) que se integra a un backend hecho en Nestjs (Nestjs, TypeORM, Jest, Swagger, SuperTest, Dockerode). La misma se encuentra alojada en poke.agustinallamanocosta.com y pokeback.agustinallamanocosta.com:8080/api para acceder a la documentación de Swagger.

## Back

### Infraestructura

Para el desarrollo de la infraestructura usé Google Cloud VM para alojar el backend con la base de datos PostgreSQL. Los mismos se encuentran dockerizados y existe un docker-compose que describe la configuración del mismo. Para poder hacer la configuración del backend, armé unos archivos Terraform que describen toda la configuración necesaria para crear los recursos en Google Cloud. Este archivo de IaC, con las credenciales correctamente configuradas, es capaz de reproducir toda la infraestructura necesaria para desplegar el backend.

### Backend CI/CD:

Para el CI/CD del backend uso GitHub Actions. Este se encarga de instalar las dependencias y cachearlas, correr el linter, correr los tests unitarios, generar el build productivo y hacer el deploy en la VM de Google Cloud.

### Gestión de Entornos:

Para la gestión de variables de entorno opté por usar Dotenv Vault, que me permite tener un repositorio de variables de configuración agnóstico. Funciona en conjunto con mi gestor de dependencias (yarn) y, en caso de migrar de plataforma de CI/CD (Jenkins, CircleCI, GitLab, etc.), puedo migrarlo sin mayores cambios. Aclaro que en este vault solo se almacenan las variables de entorno de "negocio", no lo relacionado a la configuración de los pipelines.

### ¿Por qué este stack para el backend?

Dada la simpleza de la app en este momento, pero sabiendo que se puede volver más compleja en el futuro, creo que este stack me permite hacer modificaciones de forma rápida, testeable y fácil sin preocuparme por aumentar la complejidad del código y manteniendo el rendimiento.

### Solución:

El problema presentado consiste en una API capaz de hacer un CRUD de cartas Pokémon, además de poder simular una batalla entre dos cartas. Para la parte del CRUD, opté por una API Rest que permite realizar todas las operaciones (PUT, PATCH, DELETE, GET), sumado a un endpoint para obtener cartas relacionadas a una misma carta por tipo de debilidad y resistencia. Las cartas se componen de lo siguiente:

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

La idea es que cada carta sea única en la app. Esto significa que una misma carta puede ser compartida por muchos usuarios y que muchos usuarios pueden tener una misma carta (haciendo una relación ManyToMany, esto se puede ver en las entidades de base de datos). Esto evitaría que la base de datos pierda su normalización. Los usuarios son autenticados por el frontend, se registran en el backend mediante el endpoint /register y el mismo les retorna un ID de usuario. Si el usuario existe, retorna el ID existente, sino crea uno nuevo. Ese ID es usado por el frontend para ejecutar operaciones con las cartas en el backend. En mis suposiciones, una carta es única si tiene el mismo nombre, tipo y expansión. Esto significa que al momento de crear una carta, primero se busca en la base de datos por esos campos antes de crear una carta nueva.

### Batalla:

Para resolver la batalla, primero pensé en hacer un sistema de herencia de tipos de cartas y aplicar un patrón strategy. La idea es que cada tipo de carta tenga una estrategia para saber cómo batallar contra otro tipo de carta. Pero después decidí no hacerlo. Primero, es muy complejo y la verdad no aporta mucho al sistema de pelea actual. Segundo, preferí tener toda la lógica de la batalla en un mismo servicio, para en caso de ser necesario, saber rápido dónde mirar para hacer modificaciones.

### Testing:

Si bien me gustaría poder hacer más tests en la app, dejé un par de tests que creo son necesarios para armar un arnés de pruebas seguro para poder hacer refactor.

* Tests unitarios por módulo, que validen la ejecución del controlador y del servicio.
* Tests de integración con alguna herramienta que ayude con la creación de dependencias externas, en este caso Dockerode para poder crear bases de datos PostgreSQL en un contenedor Docker.

## Front

### Infraestructura

Para el frontend opté por usar Firebase Hosting, porque es fácil y rápido de configurar con mi cuenta de Gmail :D

### Frontend CI/CD:

Al igual que el backend, el pipeline del frontend instala/cachea dependencias, valida el linter y hace el build/deployment, pero no corre tests. No llegué a sumarlos al pipeline :(

### Gestión de Entornos:

Igual que el backend, Dotenv Vault.

### Testing:

Dado la simplesa de las pantallas y de los componentes decidi que lo mejor es tener test de snapshot para tener validacion de stilos y test de integracion con cypress para test mas complejos.

### ¿Por qué este stack para el backend?

Dado la simplisidad del front, no vi necesario sumar algun framework que sume mas complejidad a toda la app.

## Solución:

El problema que se nos plantea es poder armar un sitio web donde se puedan visualizar cartas Pokémon y realizar una búsqueda entre ellas. Para poder después hacer una simulación de la batalla entre dos cartas. Para poder hacer esto, opté por usar React con Bootstrap para poder hacer una UI responsive, enfocándome en buenas prácticas de usabilidad. Además, sumé una vista más para poder cargar nuevas cartas. El frontend tiene un login que autentica con usuario de Gmail para poder validar el ingreso a la app.

## Otros features:

* Todos los DTO del backend tienen validaciones básicas en los campos.
* El backend tiene tests de integración.
* El frontend tiene filtros para la vista de cartas.

## Cosas que no están al 100%:

* Login: el frontend tiene login con Google, pero no pude terminar la autenticación del token contra el backend.
* Estilos del frontend: me faltó sumar algunas animaciones y mostrar algunos resultados del backend para mejorar la experiencia.
* Imágenes: no llegué a poder guardar imágenes en el backend para las cartas.
* Testing del frontend: tenía la idea de poder usar Cypress para hacer tests más completos y no solo de snapshot.

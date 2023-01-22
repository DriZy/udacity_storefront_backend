# Udacity: Storefront Backend API

This is a backend API build in Nodejs for an online store. It exposes a RESTful API that will be used by the frontend developer to present data to the frontend.

The database schema and and API route information can be found in the [REQUIREMENT.md](REQUIREMENTS.md)

## Setup Instructions
Clone or fork this repository 

## Install packages
run `yarn install` or `npm install` with the clone/forked project directory to install all packages required for the project. 

## Enviromental Variables Set up
Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you.

**NB:** The given values are used in developement and testing but not in production.
```
ENV=test
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=
POSTGRES_USER=
POSTGRES_PASSWORD=
BCRYPT_PASSWORD=
SALT_ROUNDS=
JWT_TOKEN_PAS=''
TOKEN_SECRET = ''
```

## Set up Database
### Create Databases
We shall create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user
    - `CREATE USER ${POSTGRES_USER} WITH PASSWORD ${POSTGRES_PASSWORD};`
- In psql run the following to create the dev and test database
    - `CREATE DATABASE ${POSTGRES_DATABASE};`
    - `CREATE DATABASE ${POSTGRES_DATABASE}_test;`
- Connect to the databases and grant all privileges
    - Grant for dev database
        - `\c ${POSTGRES_DATABASE}`
        - `GRANT ALL PRIVILEGES ON DATABASE ${POSTGRES_DATABASE} TO ${POSTGRES_USER};`
    - Grant for test database
        - `\c ${POSTGRES_DATABASE}_test`
        - `GRANT ALL PRIVILEGES ON DATABASE ${POSTGRES_DATABASE}_test TO ${POSTGRES_USER};`

### Migrate Database
Navigate to the root directory and run the command below to migrate the database
by running `db-migrate up`


## Start App
`yarn watch` or `npm run watch`

### Running Ports
After start up, the server will start on port `3000` and the database on port `5432`

## Endpoint Access
All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file.

## Token and Authentication
Tokens are passed along with the http header as
```
Authorization   Bearer <token>
```

## Testing
Run test with

`yarn test`

It sets the environment to `test`, migrates up tables for the test database, run the test then migrate down all the tables for the test database.



## Important Notes

### Environment Variables
Environment variables are set in the `.env` file and added in `.gitignore` so that it won't be added to github. However, I had provided the names of the variables that need to be set above. I also provided the values that were used in development and testing.


### Changing Enviroment to testing
I had set up two databases, one for development and the other for testing. During testing, I had to make sure the testing database is used instead of the developement database.

To achieve this, I set up a variable in the `.env` file which is by default set to `dev`. During testing, the command `yarn test` will set this variable to `testing` in the package.json. Here is the complete command.
`"test": "ENV=test && npx tsc && db-migrate --env test up && jasmine && db-migrate db:drop test"` in `package.json`

The first command migrates all tables then the second command changes the environment variable `ENV` to testing, then the jasmine is run and then after testing, the database is reset.

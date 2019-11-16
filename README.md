# Testify Backend

Initialize this project with the command `npm i`.

package.json includes the following dependencies:

- express
- morgan
- bcryptjs
- dotenv
- helmet
- knex
- sqlite3

and dev dependencies

- cross-env
- jest
- nodemon
- supertest

### Folder and File Structure

The below represents the scaffolding structure for the project.

    root
    	api
    		 -server.js
    		 -middleware-config.js
    		 -api-router.js
    	routes
    		 -register-router.js
    		 -auth-router.js
    		 -app-router.js
    	helpers
    		 - jwt-helpers.js
    		 - register-helpers.js
    	middleware
    		 - ensureAuth.js
    		 - restricted-middleware.js
      models
         - users-model.js
         - app-model.js
    	data
    		 - db-config.js
    		 - database.db3
    		 - testing.db3
    		migrations
    		seeds

## Scripts

Use `npm run tests` to run tests.
User `npm run server` to run server.

## Database

The primary database for this API is `database.db3`. The testing database is `test.db3`.
Postgres will be adopted during deployment.

#### Tables

| `users`    | type    | required          | unique |
| ---------- | ------- | ----------------- | ------ |
| id         | integer | required-assigned | yes    |
| username   | varchar | yes               | yes    |
| first_name | varchar | no                | no     |
| last_name  | varchar | no                | no     |
| role\*\*   | varchar | yes               | no     |

Data in `users` will initially be seeded with filler data.

\*\*Role is expected to be either `instructor` or `student`.

## Endpoints

### Registration

| Method | Endpoint                                      | Data Sent (Required)     | Data Sent (Optional)  | Data Returned                                    |
| ------ | --------------------------------------------- | ------------------------ | --------------------- | ------------------------------------------------ |
| POST   | https://bw-testify.herokuapp.com/api/register | username, password, role | first_name, last_name | object id, username, first_name, last_name, role |

When the API recieves a user, it will run checks

- to verify that the username meets a minimum length and contains no spaces,
- to verify that the password meets a minimum length
- to verify that the role is either `student` or `instructor`

When one of the above tests fail the server will send back an object with a message property which describes that an error has been encountered. The second property of the object is an array containing error messages for the failed tests. For example, when a user attempts to register an account with no role specified, the server returns the following object: `{message: 'x registration error(s) were encountered. ', errors: ['Role must be 'student' or 'instructor.']`

### Login

| Method | Endpoint                                   | Data Sent (Required) | Data Sent (Optional) | Data Returned      |
| ------ | ------------------------------------------ | -------------------- | -------------------- | ------------------ |
| POST   | https://bw-testify.herokuapp.com/api/login | username, password   | n/a                  | JSON Web Token\*\* |

When a login request is made, the server will check if the username exists, and if so, whether the password is correct.

- When an incorrect username is provided, the server returns the a 401 error with the message `User does not exist, check username and try again.`.
- When an incorrect password is provided, the error 401 is returned with the message `User provided incorrect password.`.
- If the server encounters an error, the error code 500 is returned along with an object containing a message and specific error.

\*\*Upon successful login, the server returns an object with a welcome message and a JSON Web Token. The decrypted token will look so:
`{ "sub": 11, "username": "harry_potter", "first_name": "Harry", "last_name": "Potter", "role": "student", "iat": 1573928017281, "exp": 1573928053281 }`

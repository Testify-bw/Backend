# Backend

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

###Folder and File Structure
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

##Scripts
Use `npm run tests` to run tests.
User `npm run server` to run server.
##Database
The primary database for this API is `database.db3`. The testing database is `test.db3`.
Postgres will be adopted during deployment.
####Tables

| `users`    | type    | required          | unique |
| ---------- | ------- | ----------------- | ------ |
| id         | integer | required-assigned | yes    |
| username   | varchar | yes               | yes    |
| first_name | varchar | no                | no     |
| last_name  | varchar | no                | no     |
| role\*\*   | varchar | yes               | no     |

Data in `users` will initially be seeded with filler data.

\*\*Role is expected to be either `instructor` or `student`.

##Endpoints
###Registration

| Method | Endpoint      | Data Sent (Required)      | Data Sent (Optional)  | Data Received                                    |
| ------ | ------------- | ------------------------- | --------------------- | ------------------------------------------------ |
| POST   | /api/register | username, password, rolle | first_name, last_name | object id, username, first_name, last_name, role |

When the API recieves a user, it will run checks

- to verify that the username meets a minimum length and contains no spaces,
- to verify that the password meets a minimum length
- to verify that the role is either `student` or `instructor`

When one of the above tests fail, the server will send back an object with a message property which describes that an error has taken place. The second property of the object is an array containing error messages for the failed tests. For example, when a user attempts to register an account with no role specified, the server returns the following object: `{message: 'Invalid registration information was provided, see errors for details.', errors: ['Role must be 'student' or 'instructor.']`

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
##Endpoints

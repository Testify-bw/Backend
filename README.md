# Testify Backend

Initialize this project with the command `npm i`.

package.json includes the following dependencies:

### Dependencies

| Dependencies | dev Dependencies |
| ------------ | ---------------- |
| express      | cross-env        |
| morgan       | jest             |
| bcryptjs     | nodemon          |
| dotenv       | supertest        |
| knex         |                  |
| sqlite3      |                  |
| pg           |                  |

and dev dependencies

- cross-env
- jest
- nodemon
- supertest

<details>
    <summary> Folder and File Structure </summary>

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
</details>
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

# API

This API is hosted at https://bw-testify.herokuapp.com/

## Endpoints

### Registration

| Method | Endpoint      | Data Sent (Required)     | Data Sent (Optional)  | Data Returned                                    |
| ------ | ------------- | ------------------------ | --------------------- | ------------------------------------------------ |
| POST   | /api/register | username, password, role | first_name, last_name | object id, username, first_name, last_name, role |

When the API recieves a user, it will run checks

- to verify that the username meets a minimum length and contains no spaces,
- to verify that the password meets a minimum length
- to verify that the role is either `student` or `instructor`

When one of the above tests fail the server will send back an object with a message property which describes that an error has been encountered. The second property of the object is an array containing error messages for the failed tests. For example, when a user attempts to register an account with no role specified, the server returns the following object: `{message: 'x registration error(s) were encountered. ', errors: ['Role must be 'student' or 'instructor.']`

### Login

| Method | Endpoint   | Data Sent (Required) | Data Sent (Optional) | Data Returned      |
| ------ | ---------- | -------------------- | -------------------- | ------------------ |
| POST   | /api/login | username, password   | n/a                  | JSON Web Token\*\* |

When a login request is made, the server will check if the username exists, and if so, whether the password is correct.

- When an incorrect username is provided, the server returns the a 401 error with the message `User does not exist, check username and try again.`.
- When an incorrect password is provided, the error 401 is returned with the message `User provided incorrect password.`.
- If the server encounters an error, the error code 500 is returned along with an object containing a message and specific error.

\*\*Upon successful login, the server returns an object with a welcome message and a JSON Web Token. The decrypted token will look so:
`{ "sub": 11, "username": "harry_potter", "first_name": "Harry", "last_name": "Potter", "role": "student", "iat": 1573928017281, "exp": 1573928053281 }`

### Retrieving Users

| method | Endpoint               | Data Sent | Data Returned            |
| ------ | ---------------------- | --------- | ------------------------ |
| GET    | /api/users             | JWT Token | Array of all users       |
| GET    | /api/users/instructors | JWT Token | Array of all instructors |
| GET    | /api/users/students    | JWT Token | Array of all students    |

Header Configuration:
`{ Content-Type: 'application/json', Authorization: token }`

Each entry in an array represents a user and will look so:
`{ id, username, first_name, last_name, role, classes** }`

\*\* As soon as class lists are implemented in the database, an array of classes the user is associated with will be returned inside the user object.

### Adding a Test

| method | Endpoint            | Data Sent                   | Data Returned           |
| ------ | ------------------- | --------------------------- | ----------------------- |
| GET    | /api/users/test/:id |                      | Object containing test. |
| POST   | /api/users/test/add | Object containing test      | n/a                     |
| PUT    | /api/users/test/:id | object with test properties | n/a                     |
| DEL    | /api/users/test/:id |                        | n/a                     |

#### Example Test Object

The server will return a test object that looks so:

```
{
test_name: "NEW New Test for POST",
class_id: 2,
author_id: 1,
questions: [{
short_answer: false,
 text: 'Is this a new question?',
 answer: 'Yes',
 question_choices: [

   'Yes', 'No', 'Maybe'
]
},
{
short_answer: true,
 text: 'A majority of this project was written in what language?',
 answer:  "Javascript"
}]
}
```
When making PUT requests for a test, the only properties in the test object need to be `test_name`, `class_id`, and `author_id`. The questions and answers will be updated using the methods  below.

#### Updating Test Questions

| method | Endpoint           | Data Sent                        | Data Returned |
| ------ | ------------------ | -------------------------------- | ------------- |
| PUT    | /api/questions/:id |  question object        | n/a           |
| DEL    | /api/questions/:id |                       | Data Returned |

A question object can look so:
```
{
short_answer: false,
 text: 'Is this a new question?',
 answer: 'Yes',
 question_choices: [

   'Yes', 'No', 'Maybe'
]

```

#### Updating Test Answers

| method | Endpoint         | Data Sent                      | Data Returned |
| ------ | ---------------- | ------------------------------ | ------------- |
| PUT    | /api/answers/:id |  object with changes | n/a           |
| DEL    | /api/answers/:id |       n/a       | Data Returned |

Updating the answer only requires a string be passed in the PUT request.

### Adding Submission

| method | Endpoint                   | Data Sent                                   | Data Returned |
| ------ | -------------------------- | ------------------------------------------- | ------------- |
| POST   | /api/users/test/answer/:id | test object containing array of answers\*\* | n/a           |


\*\*Must have same structure as test object from GET request.


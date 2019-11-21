const request = require('supertest');
const server = require('./server');

const db = require('../data/db-config');

const testUser = {
  username: 'testing-user',
  password: 'password',
  role: 'student'
}


it('DB should operate in testing ', () => {
  expect(process.env.DB_ENV).toBe('testing')
});

describe('server', () => {
  describe('GET /', () => {
    it('should return 201 status', () => {
      return request(server)
        .get('/')
        .then(res => {
          expect(res.status).toBe(200);
        })
    })
  })
})

describe('POST api/register', () => {
  beforeEach(async () => {
    await db('users').truncate();
  })
  it('should return 201 status', () => {
    return request(server)
      .post('/api/register')
      .send(testUser)
      .expect(201)
  })
  it('should return json formatted response', () => {
    return request(server)
      .post('/api/register')
      .send(testUser)
      .expect('Content-Type', /json/)
  })
})

describe('POST api/login', () => {
  it('should return 200 status', () => {
    return request(server)
      .post('/api/login')
      .send(testUser)
      .expect(200)
  })
  it('should return json formatted response', () => {
    return request(server)
      .post('/api/login')
      .send(testUser)
      .expect('Content-Type', /json/)
  })
})


/*
const { test_name, author_id, questions, class_id } = submission
    const test = {
        test_name,
        author_id,
        class_id
    }
*/

const testObj = {
  test_name: "testname",
  class_id: 1,
  author_id: 1,

  questions: [
    {
      text: "question1",
      short_answer: false,
      question_choices: ["choice1", "choice2", "choice3"],
      answer: "question1 answer"
    },
    {
      text: "question2",
      short_answer: true,
      question_choices: ["choice1"],
      answer: "question2 answer"
    },
    {
      text: "question3",
      short_answer: false,
      question_choices: ["choice1", "choice2", "choice3"],
      answer: "question3 answer"
    }
  ]
}

describe("POST /api/users/test/add", () => {
  // beforeEach(async () => {
  //   await db('questions').truncate();
  // });

  it("returns status 201 when posting a new test", async () => {
    const res = await request(server)
      .post("/api/users/test/add")
      .set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoidF93b2xzZXkiLCJmaXJzdF9uYW1lIjoiVGhvbWFzIiwibGFzdF9uYW1lIjoiV29sc2V5Iiwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE1NzQyOTM5OTE0NTEsImV4cCI6MTU3NDI5NDAyNzQ1MX0.wli6zQTJhQNEljLbVhAgmqp9CXCuC8aotib5BN-Zaw4")
      .send(testObj);

    expect(res.status).toBe(201);
  })
})




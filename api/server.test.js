const db = require('../data/dbConfig')
const server = require('./server')
const request = require('supertest')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBe(true)
})

describe('tests the post routes', () => {
  describe('tests post register', () => {
    it('fails when no info is sent', async () => {
      const res = await request(server).post('/api/auth/register')
      expect(res.status).toBe(304)
    })
    test('adds a user', async () => {
      await request(server).post('/api/auth/register').send({
         username: 'naruto',
         password: 'uzumaki'
        })
      const users = await db('users')
      expect(users).toHaveLength(1)
    })
  })
  describe('tests post login works properly', () => {
    it('fails when there is nothing sent', async () => {
      const res = await request(server).post('/api/auth/login')
      expect(res.status).toBe(304)
    })
  })
})

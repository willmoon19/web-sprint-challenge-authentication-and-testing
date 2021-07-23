const db = require('../data/dbConfig')
const server = require('./server')
const request = require('supertest')

const user1 = { username: 'naruto', password: 'uzumaki'}
const user2 = { username: 'sasuke', password: 'uchiha'}
const user3 = { username: 'sakura', password: 'saruno'}

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
      await request(server).post('/api/auth/register').send(user1)
      const users = await db('users')
      expect(users).toHaveLength(1)
    })
  })
})

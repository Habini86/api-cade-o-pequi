import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Authenticate (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
    await prisma.fruit.deleteMany()
    await prisma.user.deleteMany()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    const password = '123456'
    const email = 'any_email@email.com'

    await request(app.server).post('/user').send({
      name: 'JavaScript',
      city: 'any_city',
      state: 'any_state',
      phone: 'any_phone',
      email: 'any_email@email.com',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email,
      password,
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})

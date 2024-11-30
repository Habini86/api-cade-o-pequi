import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Register (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
    await prisma.fruit.deleteMany()
    await prisma.user.deleteMany()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a new user', async () => {
    const response = await request(app.server).post('/user').send({
      name: 'JavaScript',
      city: 'any_city',
      state: 'any_state',
      phone: 'any_phone',
      email: 'any_email1@email.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
  })
})

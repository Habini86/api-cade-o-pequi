import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
    await prisma.fruit.deleteMany()
    await prisma.user.deleteMany()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    const password = '123456'
    const email = 'any_email@email.com'

    await request(app.server).post('/user').send({
      name: 'JavaScript',
      city: 'any_city',
      state: 'any_state',
      phone: 'any_phone',
      email,
      password,
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email,
      password,
    })

    const cookies = authResponse.get('Set-Cookie') ?? []

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})

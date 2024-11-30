import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Create (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a new fruit', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/fruit/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pequi',
        description: 'A delicious red apple',
        street: '123 Apple St',
        number: 456,
        cep: '12345-678',
        city: 'Fruitville',
        state: 'CA',
        userId: 'fake-user-id',
      })

    expect(response.statusCode).toEqual(201)
  })
})

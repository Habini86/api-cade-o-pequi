import { env } from '@/env'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  const password = '123456'
  const email = 'any_email3@email.com'

  await prisma.fruit.deleteMany()
  await prisma.user.deleteMany()

  await prisma.user.create({
    data: {
      name: 'JavaScript',
      city: 'Belo Horizonte',
      state: 'Minas Gerais',
      phone: 'any_phone',
      email,
      password_Hash: await hash(password, env.NUMBER_PASS_HASH),
    },
  })

  const authToken = await request(app.server).post('/sessions').send({
    email,
    password,
  })

  const { token } = authToken.body

  return {
    token,
  }
}

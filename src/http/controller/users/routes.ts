import { FastifyInstance } from 'fastify'

import { register } from './register'
import { authenticate } from './authenticate'
import { refresh } from './refresh'

export async function userRoutes(app: FastifyInstance) {
  app.post('/user', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)
}

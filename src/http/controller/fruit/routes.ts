import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
// import { search } from './search'

export async function fruitRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/fruit/create', create)
  // app.get('/animals/search', search)
}

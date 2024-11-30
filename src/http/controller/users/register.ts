import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUserUseCase } from '@/use-cases/factories/make-register-user'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    city: z.string(),
    state: z.string(),
    phone: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, city, state, phone, email, password } =
    registerBodySchema.parse(request.body)

  try {
    const registerUsertionUseCase = makeRegisterUserUseCase()

    await registerUsertionUseCase.execute({
      name,
      city,
      state,
      phone,
      email,
      password,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}

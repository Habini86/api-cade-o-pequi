import { makeCreateFruitUseCase } from '@/use-cases/factories/make-create-fruit-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { FruitType } from '@prisma/client'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createFruitBodySchema = z.object({
    name: z.nativeEnum(FruitType),
    description: z.string(),
    street: z.string(),
    number: z.number().nullable(),
    cep: z.string(),
    city: z.string(),
    state: z.string(),
  })

  const userId = request.user.sub

  const { name, description, street, number, cep, city, state } =
    createFruitBodySchema.parse(request.body)

  const fruitUseCase = makeCreateFruitUseCase()

  const { fruit } = await fruitUseCase.execute({
    name,
    description,
    userId,
    street,
    number,
    cep,
    city,
    state,
  })

  return reply.status(201).send({ fruit })
}

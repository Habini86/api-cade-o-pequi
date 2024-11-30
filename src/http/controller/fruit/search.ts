import { makeSearchFruitsUseCase } from '@/use-cases/factories/make-search-fruits-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { FruitType } from '@prisma/client'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchFruitsQuerySchema = z.object({
    page: z.coerce.number().min(1).positive().default(1),
    q: z
      .string()
      .transform((str) => JSON.parse(str))
      .pipe(
        z.object({
          name: z.nativeEnum(FruitType).optional(),
          city: z.string().optional(),
          state: z.string().optional(),
        }),
      )
      .optional(),
  })

  const { q, page } = searchFruitsQuerySchema.parse(request.query)

  const searchFruitsUseCase = makeSearchFruitsUseCase()

  const fruits = await searchFruitsUseCase.execute({
    query: q,
    page,
  })

  return reply.status(200).send({
    fruits,
  })
}

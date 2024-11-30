import { Prisma, FruitType } from '@prisma/client'
import { FruitRepository } from '../fruit-repository'
import { createId } from '@paralleldrive/cuid2'
import { prisma } from '@/lib/prisma'

export class PrismaFruitRepository implements FruitRepository {
  async create(data: Prisma.FruitUncheckedCreateInput) {
    const fruit = await prisma.fruit.create({
      data: {
        id: data.id ? data.id : createId(),
        name: data.name,
        description: data.description,
        street: data.street,
        cep: data.cep,
        city: data.city,
        userId: data.userId,
        state: data.state,
        number: data.number || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return fruit
  }

  async findById(id: string) {
    const fruit = await prisma.fruit.findUnique({
      where: { id },
    })
    return fruit
  }

  async findMany(
    page: number,
    query?: { name?: FruitType; city?: string; state?: string },
  ) {
    const fruits = await prisma.fruit.findMany({
      where: {
        AND: [
          query?.name ? { name: query.name } : {},
          query?.city ? { city: { contains: query.city } } : {},
          query?.state ? { state: { contains: query.state } } : {},
        ],
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return fruits
  }
}

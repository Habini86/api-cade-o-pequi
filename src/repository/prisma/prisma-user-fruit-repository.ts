import { PrismaClient, Prisma, UserFruit } from '@prisma/client'
import { UserFruitRepository } from '../user-fruit-repository'

export class PrismaUserFruitRepository implements UserFruitRepository {
  private prisma = new PrismaClient()

  async create(data: Prisma.UserFruitUncheckedCreateInput): Promise<UserFruit> {
    return this.prisma.userFruit.create({
      data,
    })
  }

  async findByUserId(userId: string): Promise<UserFruit[]> {
    return this.prisma.userFruit.findMany({
      where: { userId },
    })
  }

  async findByFruitId(fruitId: string): Promise<UserFruit[]> {
    return this.prisma.userFruit.findMany({
      where: { fruitId },
    })
  }

  async findById(id: string): Promise<UserFruit | null> {
    return this.prisma.userFruit.findUnique({
      where: { : id },
    })
  }
}

import { Prisma, UserFruit } from '@prisma/client'

export interface UserFruitRepository {
  create(data: Prisma.UserFruitUncheckedCreateInput): Promise<UserFruit>
  findByUserId(userId: string): Promise<UserFruit[]>
  findByFruitId(fruitId: string): Promise<UserFruit[]>
}

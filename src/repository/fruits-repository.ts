import { Prisma, Fruit, FruitType } from '@prisma/client'

export interface findManyQuery {
  name?: FruitType
  city?: string
  state?: string
}

export interface FruitsRepository {
  create(data: Prisma.FruitUncheckedCreateInput): Promise<Fruit>
  findById(id: string): Promise<Fruit | null>
  findMany(page: number, query?: findManyQuery): Promise<Fruit[]>
}

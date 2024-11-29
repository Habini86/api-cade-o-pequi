import { Prisma, FruitLocal } from '@prisma/client'

export interface FruitLocalRepository {
  create(data: Prisma.FruitLocalUncheckedCreateInput): Promise<FruitLocal>
  findByFruitId(fruitId: string): Promise<FruitLocal[]>
  findByLocalId(localId: string): Promise<FruitLocal[]>
}

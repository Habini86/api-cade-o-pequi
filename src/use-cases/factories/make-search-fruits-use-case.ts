import { PrismaFruitRepository } from '@/repository/prisma/prisma-fruit-repository'
import { SearchFruitsUseCase } from '@/use-cases/search-fruits'

export function makeSearchFruitsUseCase() {
  const fruitRepository = new PrismaFruitRepository()
  const useCase = new SearchFruitsUseCase(fruitRepository)

  return useCase
}

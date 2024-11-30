import { PrismaFruitRepository } from '@/repository/prisma/prisma-fruit-repository'
import { PrismaUserRepository } from '@/repository/prisma/prisma-user-repository'
import { CreateFruitUseCase } from '@/use-cases/create-fruit'

export function makeCreateFruitUseCase() {
  const fruitRepository = new PrismaFruitRepository()
  const userRepository = new PrismaUserRepository()
  const useCase = new CreateFruitUseCase(fruitRepository, userRepository)

  return useCase
}

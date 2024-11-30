import { PrismaUserRepository } from '@/repository/prisma/prisma-user-repository'
import { RegisterUserUseCase } from '../register-user'

export function makeRegisterUserUseCase() {
  const UserRepository = new PrismaUserRepository()

  const useCase = new RegisterUserUseCase(UserRepository)

  return useCase
}

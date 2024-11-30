import { PrismaUserRepository } from '@/repository/prisma/prisma-user-repository'
import { AuthenticateUserUseCase } from '../authenticate-user'

export function makeAuthenticateUserUseCase() {
  const UserRepository = new PrismaUserRepository()

  const useCase = new AuthenticateUserUseCase(UserRepository)

  return useCase
}

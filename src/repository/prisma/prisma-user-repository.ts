import { PrismaClient, Prisma, User } from '@prisma/client'
import { UserRepository } from '../user-repository'

export class PrismaUserRepository implements UserRepository {
  private prisma = new PrismaClient()

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    })
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    })
  }
}

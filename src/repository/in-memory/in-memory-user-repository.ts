import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../user-repository'
import { createId } from '@paralleldrive/cuid2'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: data.id ? data.id : createId(),
      email: data.email,
      name: data.name,
      password_Hash: data.password_Hash,
      phone: data.phone,
      city: data.city,
      state: data.state,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findById(id: string) {
    const user = this.items.find((user) => user.id === id)

    return user || null
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email)

    return user || null
  }
}

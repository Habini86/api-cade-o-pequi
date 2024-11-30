import { Prisma, Fruit } from '@prisma/client'
import { FruitRepository } from '../fruit-repository'
import { createId } from '@paralleldrive/cuid2'

export class InMemoryFruitRepository implements FruitRepository {
  public items: Fruit[] = []

  async create(data: Prisma.FruitUncheckedCreateInput): Promise<Fruit> {
    const fruit: Fruit = {
      id: data.id ? data.id : createId(),
      name: data.name,
      description: data.description,
      street: data.street,
      cep: data.cep,
      city: data.city,
      userId: data.userId,
      state: data.state,
      number: data.number || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(fruit)

    return fruit
  }

  async findById(id: string): Promise<Fruit | null> {
    const fruit = this.items.find((fruit) => fruit.id === id)
    return fruit || null
  }

  async findMany(
    page: number,
    query?: { name?: string; city?: string; state?: string },
  ): Promise<Fruit[]> {
    return this.items
      .filter((fruit) => {
        let matchesQuery = true

        if (query) {
          if (query.name) {
            matchesQuery = fruit.name === query.name
            if (!matchesQuery) return false
          }
          if (query.city) {
            matchesQuery = fruit.city.includes(query.city)
            if (!matchesQuery) return false
          }
          if (query.state) {
            matchesQuery = fruit.state.includes(query.state)
            if (!matchesQuery) return false
          }
        }

        return matchesQuery
      })
      .slice((page - 1) * 20, page * 20)
  }
}

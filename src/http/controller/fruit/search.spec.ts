import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryFruitRepository } from '@/repository/in-memory/in-memory-fruit-repository'
import { InMemoryUserRepository } from '@/repository/in-memory/in-memory-user-repository'
import { SearchFruitsUseCase } from '@/use-cases/search-fruits'
import { hash } from 'bcryptjs'
import { env } from '@/env'
import { FruitType } from '@prisma/client'

let sut: SearchFruitsUseCase
let fruitRepository: InMemoryFruitRepository
let userRepository: InMemoryUserRepository

describe('Search Fruits Use Case', () => {
  beforeEach(async () => {
    fruitRepository = new InMemoryFruitRepository()
    userRepository = new InMemoryUserRepository()
    sut = new SearchFruitsUseCase(fruitRepository)

    await userRepository.create({
      id: 'user-01',
      name: 'JavaScript',
      city: 'any_city',
      state: 'any_state',
      phone: 'any_phone',
      email: 'any_email',
      password_Hash: await hash('123456', env.NUMBER_PASS_HASH),
    })

    await userRepository.create({
      id: 'user-02',
      name: 'JavaScript',
      city: 'city',
      state: 'any_state',
      phone: 'any_phone',
      email: 'any_email2',
      password_Hash: await hash('123456', env.NUMBER_PASS_HASH),
    })
  })

  it('should be able to search for fruits using specific query parameters', async () => {
    await fruitRepository.create({
      name: FruitType.Pequi,
      description: 'any_description',
      street: 'any_street',
      number: 123,
      cep: 'any_cep',
      city: 'any_city',
      state: 'any_state',
      userId: 'user-01',
    })

    await fruitRepository.create({
      name: FruitType.Buriti,
      description: 'any_description',
      street: 'any_street',
      number: 123,
      cep: 'any_cep',
      city: 'any_city',
      state: 'any_state',
      userId: 'user-01',
    })

    const { fruits } = await sut.execute({
      page: 1,
      query: {
        name: FruitType.Pequi,
      },
    })

    expect(fruits).toHaveLength(1)
    expect(fruits).toEqual([
      expect.objectContaining({
        name: FruitType.Pequi,
      }),
    ])
  })

  it('should be able to search for fruits using specific city and state', async () => {
    await fruitRepository.create({
      name: FruitType.Pequi,
      description: 'any_description',
      street: 'any_street',
      number: 123,
      cep: 'any_cep',
      city: 'any_city',
      state: 'any_state',
      userId: 'user-01',
    })

    await fruitRepository.create({
      name: FruitType.Buriti,
      description: 'any_description',
      street: 'any_street',
      number: 123,
      cep: 'any_cep',
      city: 'city',
      state: 'any_state',
      userId: 'user-02',
    })

    const { fruits } = await sut.execute({
      page: 1,
      query: {
        city: 'any_city',
        state: 'any_state',
      },
    })

    expect(fruits).toHaveLength(1)
    expect(fruits).toEqual([
      expect.objectContaining({
        name: FruitType.Pequi,
      }),
    ])
  })

  it('should be able to search for fruits using specific state', async () => {
    await fruitRepository.create({
      name: FruitType.Pequi,
      description: 'any_description',
      street: 'any_street',
      number: 123,
      cep: 'any_cep',
      city: 'any_city',
      state: 'any_state',
      userId: 'user-01',
    })

    await fruitRepository.create({
      name: FruitType.Buriti,
      description: 'any_description',
      street: 'any_street',
      number: 123,
      cep: 'any_cep',
      city: 'city',
      state: 'any_state',
      userId: 'user-02',
    })

    const { fruits } = await sut.execute({
      page: 1,
      query: { state: 'any_state' },
    })

    expect(fruits).toHaveLength(2)
  })

  it('should return an empty array when no fruits match the search criteria for pagination', async () => {
    const { fruits } = await sut.execute({
      page: 1,
    })

    expect(fruits).toHaveLength(0)
  })
})

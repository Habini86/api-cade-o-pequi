import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryFruitRepository } from '../repository/in-memory/in-memory-fruit-repository'
import { SearchFruitsUseCase } from './search-fruits'
import { FruitType } from '@prisma/client'

let sut: SearchFruitsUseCase
let fruitRepository: InMemoryFruitRepository

describe('Search Fruits Use Case', () => {
  beforeEach(() => {
    fruitRepository = new InMemoryFruitRepository()
    sut = new SearchFruitsUseCase(fruitRepository)

    fruitRepository.create({
      id: 'fruit-01',
      name: FruitType.Pequi,
      description: 'A delicious fruit',
      street: '123 Main St',
      number: 456,
      cep: '12345-678',
      city: 'City',
      state: 'State',
      userId: 'user-01',
    })

    fruitRepository.create({
      id: 'fruit-02',
      name: FruitType.Buriti,
      description: 'Another delicious fruit',
      street: '456 Elm St',
      number: 789,
      cep: '98765-432',
      city: 'Another City',
      state: 'Another State',
      userId: 'user-02',
    })
  })

  it('should be able to search fruits without query', async () => {
    const { fruits } = await sut.execute({ page: 1 })

    expect(fruits).toHaveLength(2)
  })

  it('should be able to search fruits with query', async () => {
    const { fruits } = await sut.execute({
      page: 1,
      query: { name: FruitType.Pequi },
    })

    expect(fruits).toHaveLength(1)
    expect(fruits[0].name).toBe(FruitType.Pequi)
  })

  it('should return only one element per page', async () => {
    const { fruits } = await sut.execute({ page: 1 })

    expect(fruits).toHaveLength(2)
  })

  it('should return an empty array when no fruits match the query', async () => {
    const { fruits } = await sut.execute({
      page: 1,
      query: { name: FruitType.Mangaba },
    })

    expect(fruits).toHaveLength(0)
  })

  it('should return the correct number of fruits per page', async () => {
    const { fruits: page1Fruits } = await sut.execute({ page: 1 })
    const { fruits: page2Fruits } = await sut.execute({ page: 2 })

    expect(page1Fruits).toHaveLength(2)
    expect(page2Fruits).toHaveLength(0)
  })

  it('should return the correct fruits on page 2 when there are 20 elements', async () => {
    for (let i = 3; i <= 22; i++) {
      await fruitRepository.create({
        id: `fruit-${i}`,
        name: FruitType.Pequi,
        description: `Fruit ${i}`,
        street: `Street ${i}`,
        number: i,
        cep: `12345-${i}`,
        city: `City ${i}`,
        state: `State ${i}`,
        userId: `user-${i}`,
      })
    }

    const { fruits: page1Fruits } = await sut.execute({ page: 1 })
    const { fruits: page2Fruits } = await sut.execute({ page: 2 })

    expect(page1Fruits).toHaveLength(20)
    expect(page2Fruits).toHaveLength(2)
    expect(page2Fruits[0].id).toBe('fruit-21')
    expect(page2Fruits[1].id).toBe('fruit-22')
  })
})

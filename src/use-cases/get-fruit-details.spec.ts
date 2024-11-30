import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryFruitRepository } from '../repository/in-memory/in-memory-fruit-repository'
import { GetFruitDetailsUseCase } from './get-fruit-details'
import { FruitType } from '@prisma/client'
import { ResourcesNotFoundError } from './errors/resources-not-found-error'

let sut: GetFruitDetailsUseCase
let fruitRepository: InMemoryFruitRepository

describe('Get Fruit Details Use Case', () => {
  beforeEach(() => {
    fruitRepository = new InMemoryFruitRepository()
    sut = new GetFruitDetailsUseCase(fruitRepository)

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
  })

  it('should be able to get fruit details', async () => {
    const { fruit } = await sut.execute({ fruitId: 'fruit-01' })

    expect(fruit.id).toBe('fruit-01')
    expect(fruit.name).toBe(FruitType.Pequi)
    expect(fruit.description).toBe('A delicious fruit')
    expect(fruit.street).toBe('123 Main St')
    expect(fruit.number).toBe(456)
    expect(fruit.cep).toBe('12345-678')
    expect(fruit.city).toBe('City')
    expect(fruit.state).toBe('State')
    expect(fruit.userId).toBe('user-01')
  })

  it('should throw an error if fruit does not exist', async () => {
    await expect(() =>
      sut.execute({ fruitId: 'non-existent-fruit' }),
    ).rejects.toBeInstanceOf(ResourcesNotFoundError)
  })
})

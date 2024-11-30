import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryFruitRepository } from '../repository/in-memory/in-memory-fruit-repository'
import { InMemoryUserRepository } from '../repository/in-memory/in-memory-user-repository'
import { CreateFruitUseCase } from './create-fruit'
import { ResourcesNotFoundError } from './errors/resources-not-found-error'
import { FruitType } from '@prisma/client'

let sut: CreateFruitUseCase
let fruitRepository: InMemoryFruitRepository
let userRepository: InMemoryUserRepository

describe('Create Fruit Use Case', () => {
  beforeEach(async () => {
    fruitRepository = new InMemoryFruitRepository()
    userRepository = new InMemoryUserRepository()
    sut = new CreateFruitUseCase(fruitRepository, userRepository)

    await userRepository.create({
      id: 'user-01',
      email: 'user@example.com',
      name: 'User',
      password_Hash: 'hashed-password',
      phone: '123456789',
      city: 'City',
      state: 'State',
    })
  })

  it('should be able to create a new fruit', async () => {
    const { fruit } = await sut.execute({
      name: FruitType.Pequi,
      description: 'A delicious fruit',
      userId: 'user-01',
      street: '123 Main St',
      number: 456,
      cep: '12345-678',
      city: 'City',
      state: 'State',
    })

    expect(fruit.id).toEqual(expect.any(String))
  })

  it('should not allow creating a fruit with a non-existent user', async () => {
    await expect(() =>
      sut.execute({
        name: FruitType.Pequi,
        description: 'A delicious fruit',
        userId: 'non-existent-user',
        street: '123 Main St',
        number: 456,
        cep: '12345-678',
        city: 'City',
        state: 'State',
      }),
    ).rejects.toBeInstanceOf(ResourcesNotFoundError)
  })
})

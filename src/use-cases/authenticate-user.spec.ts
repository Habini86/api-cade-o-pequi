import { User } from '@prisma/client'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { UserRepository } from '../repository/user-repository'
import { AuthenticateUserUseCase } from './authenticate-user'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryUserRepository } from '../repository/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'

describe('AuthenticateUserUseCase', () => {
  let userRepository: UserRepository
  let sut: AuthenticateUserUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new AuthenticateUserUseCase(userRepository)
  })

  it('should authenticate user with correct email and password', async () => {
    const password = 'password123'
    const hashedPassword = await hash(password, 6)

    const user: User = {
      id: '1',
      name: 'John Doe',
      city: 'City',
      state: 'State',
      phone: '123456789',
      email: 'johndoe@example.com',
      password_Hash: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(user)

    const response = await sut.execute({
      email: 'johndoe@example.com',
      password,
    })

    expect(response.user).toEqual(user)
  })

  it('should throw error if email is incorrect', async () => {
    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(null)

    await expect(
      sut.execute({
        email: 'wrongemail@example.com',
        password: 'password123',
      }),
    ).rejects.toThrow(InvalidCredentialsError)
  })

  it('should throw error if password is incorrect', async () => {
    const password = 'password123'
    const hashedPassword = await hash(password, 6)

    const user: User = {
      id: '1',
      name: 'John Doe',
      city: 'City',
      state: 'State',
      phone: '123456789',
      email: 'johndoe@example.com',
      password_Hash: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(user)

    await expect(
      sut.execute({
        email: 'johndoe@example.com',
        password: 'wrongpassword',
      }),
    ).rejects.toThrow(InvalidCredentialsError)
  })
})

import { describe, it, expect, beforeEach } from 'vitest'
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

    await userRepository.create({
      id: '1',
      name: 'John Doe',
      city: 'City',
      state: 'State',
      phone: '123456789',
      email: 'johndoe@example.com',
      password_Hash: await hash(password, 6),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should throw error if email is incorrect', async () => {
    await userRepository.create({
      id: '1',
      name: 'John Doe',
      city: 'City',
      state: 'State',
      phone: '123456789',
      email: 'johndoe@example.com',
      password_Hash: await hash('password123', 6),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await expect(
      sut.execute({
        email: 'wrongemail@example.com',
        password: 'password123',
      }),
    ).rejects.toThrow(InvalidCredentialsError)
  })

  it('should throw error if password is incorrect', async () => {
    const password = 'password123'

    await userRepository.create({
      id: '1',
      name: 'John Doe',
      city: 'City',
      state: 'State',
      phone: '123456789',
      email: 'johndoe@example.com',
      password_Hash: await hash(password, 6),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await expect(
      sut.execute({
        email: 'johndoe@example.com',
        password: 'wrongpassword',
      }),
    ).rejects.toThrow(InvalidCredentialsError)
  })
})

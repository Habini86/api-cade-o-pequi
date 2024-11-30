import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUserRepository } from '../repository/in-memory/in-memory-user-repository'
import { RegisterUserUseCase } from '../use-cases/register-user'
import { compare } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/user-already-exists-error'

let sut: RegisterUserUseCase
let usersRepository: InMemoryUserRepository

describe('Register User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new RegisterUserUseCase(usersRepository)
  })

  it('should be able to register a new user', async () => {
    const password = '123456'

    const { user } = await sut.execute({
      name: 'JavaScript',
      city: 'any_city',
      state: 'any_state',
      phone: 'any_phone',
      email: 'any_email',
      password,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it("should be able to hash the user's password during the registration process", async () => {
    const password = '123456'

    const { user } = await sut.execute({
      name: 'JavaScript',
      city: 'any_city',
      state: 'any_state',
      phone: 'any_phone',
      email: 'any_email',
      password,
    })

    const isPasswordCorrectHash = await compare(password, user.password_Hash)

    expect(isPasswordCorrectHash).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const password = '123456'

    await sut.execute({
      name: 'JavaScript',
      city: 'any_city',
      state: 'any_state',
      phone: 'any_phone',
      email: 'any_email',
      password,
    })

    await expect(() =>
      sut.execute({
        name: 'JavaScript',
        city: 'any_city',
        state: 'any_state',
        phone: 'any_phone',
        email: 'any_email',
        password,
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})

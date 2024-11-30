import { User } from '@prisma/client'
import { UserRepository } from '../repository/user-repository'
import { hash } from 'bcryptjs'
import { env } from '@/env'
import { OrganizationAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUserUseCaseRequest {
  name: string
  city: string
  state: string
  email: string
  password: string
  phone: string
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {
    /* ... */
  }

  async execute({
    name,
    city,
    state,
    phone,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const user = await this.userRepository.create({
      name,
      city,
      state,
      phone,
      email,
      password_Hash: await hash(password, env.NUMBER_PASS_HASH),
    })

    return {
      user,
    }
  }
}

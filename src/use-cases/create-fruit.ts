import { Fruit, FruitType } from '@prisma/client'
import { FruitRepository } from '../repository/fruit-repository'
import { UserRepository } from '../repository/user-repository'
import { ResourcesNotFoundError } from './errors/resources-not-found-error'

interface CreateFruitUseCaseRequest {
  name: FruitType
  description: string
  userId: string
  street: string
  number: number | null
  cep: string
  city: string
  state: string
}

interface CreateFruitUseCaseResponse {
  fruit: Fruit
}

export class CreateFruitUseCase {
  constructor(
    private fruitRepository: FruitRepository,
    private userRepository: UserRepository,
  ) {
    /* ... */
  }

  async execute({
    name,
    description,
    userId,
    street,
    number,
    cep,
    city,
    state,
  }: CreateFruitUseCaseRequest): Promise<CreateFruitUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourcesNotFoundError()
    }

    const fruit = await this.fruitRepository.create({
      name,
      description,
      street,
      number,
      cep,
      city,
      state,
      userId,
    })

    return { fruit }
  }
}

import { FruitRepository } from '@/repository/fruit-repository'
import { ResourcesNotFoundError } from './errors/resources-not-found-error'

interface GetFruitDetailsUseCaseRequest {
  fruitId: string
}

interface GetFruitDetailsUseCaseResponse {
  fruit: {
    id: string
    name: string
    description: string
    street: string
    number: number | null
    cep: string
    city: string
    state: string
    userId: string
  }
}

export class GetFruitDetailsUseCase {
  constructor(private fruitRepository: FruitRepository) {
    /* ... */
  }

  async execute({
    fruitId,
  }: GetFruitDetailsUseCaseRequest): Promise<GetFruitDetailsUseCaseResponse> {
    const fruit = await this.fruitRepository.findById(fruitId)

    if (!fruit) {
      throw new ResourcesNotFoundError()
    }

    return {
      fruit: {
        id: fruit.id,
        name: fruit.name,
        description: fruit.description,
        street: fruit.street,
        number: fruit.number,
        cep: fruit.cep,
        city: fruit.city,
        state: fruit.state,
        userId: fruit.userId,
      },
    }
  }
}

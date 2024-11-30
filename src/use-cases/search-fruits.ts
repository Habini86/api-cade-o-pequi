import { FruitRepository, findManyQuery } from '@/repository/fruit-repository'

interface SearchFruitsUseCaseRequest {
  page: number
  query?: findManyQuery
}

interface SearchFruitsUseCaseResponse {
  fruits: {
    id: string
    name: string
    description: string
    street: string
    number: number | null
    cep: string
    city: string
    state: string
    userId: string
  }[]
}

export class SearchFruitsUseCase {
  constructor(private fruitRepository: FruitRepository) {
    /* ... */
  }

  async execute({
    page,
    query,
  }: SearchFruitsUseCaseRequest): Promise<SearchFruitsUseCaseResponse> {
    const fruits = await this.fruitRepository.findMany(page, query)

    return {
      fruits: fruits.map((fruit) => ({
        id: fruit.id,
        name: fruit.name,
        description: fruit.description,
        street: fruit.street,
        number: fruit.number,
        cep: fruit.cep,
        city: fruit.city,
        state: fruit.state,
        userId: fruit.userId,
      })),
    }
  }
}

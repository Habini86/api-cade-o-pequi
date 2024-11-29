import { Prisma, Local } from '@prisma/client'

export interface LocalRepository {
  create(data: Prisma.LocalUncheckedCreateInput): Promise<Local>
  findById(id: string): Promise<Local | null>
  findMany(
    page: number,
    query?: { city?: string; state?: string },
  ): Promise<Local[]>
}

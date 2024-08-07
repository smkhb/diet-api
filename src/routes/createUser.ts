import { FastifyInstance } from 'fastify'
import { knex } from '../databse'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export async function createUser(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createUserSchema = z.object({
      name: z.string(),
    })
    const { name } = createUserSchema.parse(request.body)

    await knex('users').insert({ id: randomUUID(), name })

    return reply.code(201).send()
  })
}
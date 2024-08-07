/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { knex } from '../databse'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export async function user(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createUserSchema = z.object({
      name: z.string(),
    })
    const { name } = createUserSchema.parse(request.body)

    await knex('users').insert({ user_id: randomUUID(), name })

    return reply.code(201).send()
  })
  app.get('/', async () => {
    const users = await knex('users').select('*')

    return { users }
  })
  app.delete('/:id', async (request) => {
    const schemaDeleteUser = z.object({
      id: z.string(),
    })
    const { id } = schemaDeleteUser.parse(request.params)
    const users = await knex('users').where({ user_id: id }).delete()

    return { users }
  })
}

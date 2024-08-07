/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { knex } from '../databse'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export async function meal(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createMealSchema = z.object({
      name: z.string(),
      description: z.string(),
      is_in_diet: z.boolean(),
    })
    const { name, description, is_in_diet } = createMealSchema.parse(
      request.body,
    )

    await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
      is_in_diet,
    })

    return reply.code(201).send()
  })

  app.get('/', async () => {
    const meals = await knex('meals').select('*')

    return { meals }
  })

  app.patch('/:id', async (request) => {
    const updateMealSchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      is_in_diet: z.boolean().optional(),
      updated_at: z.string().optional(),
    })

    const { name, description, is_in_diet, updated_at } =
      updateMealSchema.parse(request.body)

    const getMealIdSchema = z.object({
      id: z.string(),
    })
    const { id } = getMealIdSchema.parse(request.params)

    const updated = await knex('meals').where({ id }).update({
      name,
      description,
      is_in_diet,
      updated_at,
    })

    return { updated }
  })

  app.delete('/:id', async (request) => {
    const getMealIdSchema = z.object({
      id: z.string(),
    })
    const { id } = getMealIdSchema.parse(request.params)

    const deleted = await knex('meals').where({ id }).delete()

    return { deleted }
  })
}

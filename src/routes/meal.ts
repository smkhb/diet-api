/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { knex } from '../databse'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export async function meal(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const schemaCreateMeal = z.object({
      user_id: z.string(),
      name: z.string(),
      description: z.string(),
      is_in_diet: z.boolean(),
    })
    const { user_id, name, description, is_in_diet } = schemaCreateMeal.parse(
      request.body,
    )

    await knex('meals').insert({
      meal_id: randomUUID(),
      user_id,
      name,
      description,
      is_in_diet,
    })

    return reply.code(201).send()
  })

  app.get('/:id', async (request) => {
    const schemaGetId = z.object({
      id: z.string(),
    })
    const { id } = schemaGetId.parse(request.params)
    const meals = await knex('meals').where({ user_id: id }).select('*')

    return { meals }
  })

  app.patch('/:id', async (request) => {
    const schemaUpdateMeal = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      is_in_diet: z.boolean().optional(),
    })

    const { name, description, is_in_diet } = schemaUpdateMeal.parse(
      request.body,
    )

    const schemaGetId = z.object({
      id: z.string(),
    })
    const { id } = schemaGetId.parse(request.params)

    const updated = await knex('meals').where({ meal_id: id }).update({
      name,
      description,
      is_in_diet,
      updated_at: knex.fn.now(),
    })

    return { updated }
  })

  app.delete('/:id', async (request) => {
    const schemaGetId = z.object({
      id: z.string(),
    })
    const { id } = schemaGetId.parse(request.params)

    const deleted = await knex('meals').where({ meal_id: id }).delete()

    return { deleted }
  })
}

/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { knex } from '../databse'
import { z } from 'zod'

export async function metric(app: FastifyInstance) {
  app.get('/totalmeals/:id', async (request) => {
    const schemaGetId = z.object({
      id: z.string(),
    })
    const { id } = schemaGetId.parse(request.params)

    const meals = await knex('meals').where({ user_id: id }).count()

    return meals[0]['count(*)']
  })
  app.get('/totalmealsond/:id', async (request) => {
    const schemaGetId = z.object({
      id: z.string(),
    })
    const { id } = schemaGetId.parse(request.params)

    const meals = await knex('meals')
      .where({ user_id: id })
      .where({ is_in_diet: true })
      .count()

    return meals[0]['count(*)']
  })
  app.get('/totalmealsoffd/:id', async (request) => {
    const schemaGetId = z.object({
      id: z.string(),
    })
    const { id } = schemaGetId.parse(request.params)

    const meals = await knex('meals')
      .where({ user_id: id })
      .where({ is_in_diet: false })
      .count()

    return meals[0]['count(*)']
  })
  app.get('/bestmealsodsequence/:id', async (request) => {
    const schemaGetId = z.object({
      id: z.string(),
    })
    const { id } = schemaGetId.parse(request.params)

    const mealsDates = await knex('meals')
      .where({ user_id: id })
      .where({ is_in_diet: true })
      .select('created_at')

    const datesArr = mealsDates.map((mealDate) => mealDate.created_at)

    const daysArray = datesArr.map((dateString) => {
      const [date] = dateString.split(' ')
      const day = date.split('-')[2] // Pega o dia
      return day
    })

    let count = 1
    let maxCount = 1

    for (let i = 1; i < daysArray.length; i++) {
      if (daysArray[i] === daysArray[i - 1] + 1) {
        count++
      } else {
        maxCount = Math.max(maxCount, count)
        count = 1 // Reinicia a contagem para a próxima sequência
      }
    }

    // Após o loop, verifica a última sequência
    maxCount = Math.max(maxCount, count)

    return maxCount
  })
}

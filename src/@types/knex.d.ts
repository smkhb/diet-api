// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  interface Tables {
    users: {
      user_id: string
      name: string
      created_at: string
    }
    meals: {
      meal_id: string
      user_id: string
      name: string
      description: string
      is_in_diet: boolean
      created_at: string
      updated_at: string
    }
  }
}

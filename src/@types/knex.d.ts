// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  interface Tables {
    users: {
      id: string
      name: string
      created_at: string
    }
  }
}

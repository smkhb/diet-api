import fastify from 'fastify'
import { createUser } from './routes/createUser'

const app = fastify()

app.register(createUser, { prefix: '/user' })

app.listen({ port: 3333 }).then(() => {
  console.log('Server is running 3333')
})

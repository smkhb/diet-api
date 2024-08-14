import fastify from 'fastify'
import { user } from './routes/user'
import { meal } from './routes/meal'
import { metric } from './routes/metric'

const app = fastify()

app.register(user, { prefix: '/users' })
app.register(meal, { prefix: '/meals' })
app.register(metric, { prefix: '/metric' })

app.listen({ port: 3333 }).then(() => {
  console.log('Server is running 3333')
})

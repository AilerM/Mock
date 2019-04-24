import { create, defaults } from 'json-server'
import { loadData } from './util'
const server = create()
const middlewares = defaults()
server.use(middlewares)
loadData(server)

server.listen(3000, () => {
  console.log(`JSON Server is running at http://localhost:${3000}`)
})

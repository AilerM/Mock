import { create, defaults } from 'json-server'
import { loadData, choosePort } from './util'
const server = create()
const middlewares = defaults()
const { MOCK_PORT } = process.env
const defaultPort = parseInt(MOCK_PORT || '', 10) || 3000

server.use(middlewares)
loadData(server)

// tslint:disable-next-line: no-floating-promises
;(async () => {
  const port = await choosePort(defaultPort)
  server.listen(port, () => {
    console.log(`JSON Server is running at http://localhost:${port}`)
  })
})()

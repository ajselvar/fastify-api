const fastify = require('fastify')({
  logger: {
    serializers: {
      res: (res) => {
        return { statusCode: res.statusCode }
      },
      req: (req) => {
        return {
          method: req.method,
          url: req.url,
          parameters: req.params,
          headers: req.headers
        }
      }
    }
  }
})
const log = fastify.log
const PORT = 3000

fastify.register(require('./routes/items'))

const start = async () => {
  try {
    await fastify.listen({ port: PORT })
    log.info("Server started")
  } catch (error) {
    log.error("Unable to start server", error)
    process.exit(1)
  }
}

start() 
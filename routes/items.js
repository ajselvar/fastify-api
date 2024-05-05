const { getItem, getItems, addItem, deleteItem, updateItem } = require('../controllers/items')

const itemSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' }
  }
}

function itemRoutes(fastify, options, done) {
  log = fastify.log;

  fastify.get('/items', {
    schema: {
      response: {
        200: {
          type: 'array',
          items: itemSchema
        }
      },
    },
    handler: getItems
  })

  fastify.get('/items/:id', {
    schema: {
      response: {
        200: itemSchema
      }
    },
    handler: getItem
  })

  fastify.post('/items', {
    schema: {
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' }
        }
      },
      response: {
        201: itemSchema
      }
    },
    handler: addItem
  })

  fastify.delete('/items/:id', {
    schema: {
      response: {
        204: {}
      }
    },
    handler: deleteItem
  })

  fastify.put('/items/:id', {
    schema: {
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' }
        }
      },
      response: {
        200: itemSchema
      }
    },
    handler: updateItem
  })

  done();
}

module.exports = itemRoutes
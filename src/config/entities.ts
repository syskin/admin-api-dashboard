export const entities = [
  {
    name: 'Users',
    endpoints: {
      getAll: {
        filter: false, // Filter by displayed fields, if post method : body, get: paramsé
        count: {
          responsePath: 'response.count'
        },
        defaultFilter: {
          order: { created: -1 },
          limit: 20
        },
        pagination: true,
        method: 'post',
        path: '/users',
        responsePath: 'response.users'
      }
    },
    displayedFields: [`username`, `email`, `created`],
    model: {
      username: { type: `String` },
      email: { type: `String` },
      created: { type: `Date` }
    },
    actions: []
  },
  {
    name: 'Recipes',
    endpoints: {
      getAll: {
        filter: true,
        defaultFilter: {
          order: { created: -1 },
          limit: 20
        },
        count: {
          responsePath: 'response.count'
        },
        method: 'post',
        path: '/recipes',
        responsePath: 'response.recipes'
      }
    },
    displayedFields: [`name`, `created`],
    model: {
      name: { type: `String` },
      created: { type: `Date` }
    },
    actions: []
  }
]

export const entities = [
  {
    name: 'Users',
    endpoints: {
      getAll: {
        method: 'post',
        path: '/users',
        responsePath: 'response.users'
      }
    },
    displayedFields: [`username`, `email`, `created`],
    defaultFilter: {
      order: { created: -1 },
      limit: 20
    },
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
        method: 'post',
        path: '/recipes',
        responsePath: 'response.recipes'
      }
    },
    displayedFields: [`name`, `created`],
    defaultFilter: {
      order: { created: -1 },
      limit: 20
    },
    model: {
      name: { type: `String` },
      created: { type: `Date` }
    },
    actions: []
  }
]

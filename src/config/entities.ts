export const entities = [
  {
    name: 'Users',
    endpoints: {
      getAll: true,
      getOneById: true,
      updateOneById: true,
      deleteOneById: true
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
      getAll: true,
      getOneById: true,
      updateOneById: true,
      deleteOneById: true
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

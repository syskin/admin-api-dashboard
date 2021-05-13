import { Configuration } from '../utils/types/EnitityConfiguration'

export const entities: Configuration[] = [
  {
    name: 'Users',
    endpoints: {
      getAll: {
        filter: false, // Filter by displayed fields, if post method : body, get: paramsé
        count: {
          responsePath: 'response.count'
        },
        defaultFilter: {
          order: { created: -1 }
        },
        pagination: true,
        method: 'post',
        path: '/users',
        responsePath: 'response.users'
      },
      getOneByIdentifier: {
        method: 'get',
        path: '/user/',
        responsePath: 'response.user'
      },
      updateOneByIdentifier: {
        method: 'patch',
        path: '/user/'
      },
      deleteOneByIdentifier: {
        method: 'delete',
        path: '/user/'
      }
    },
    displayedFields: [`username`, `email`, `created`],
    model: {
      _id: { type: `String`, identifier: true },
      username: { type: `String` },
      email: { type: `String` },
      created: { type: `Date` },
      emailVerified: { type: `Boolean` }
    },
    actions: []
  },
  {
    name: 'Recipes',
    endpoints: {
      getAll: {
        filter: true,
        defaultFilter: {
          order: { created: -1 }
        },
        count: {
          responsePath: 'response.count'
        },
        pagination: true,
        method: 'post',
        path: '/recipes',
        responsePath: 'response.recipes'
      },
      getOneByIdentifier: {
        method: 'get',
        path: '/recipe/',
        responsePath: 'response.recipe'
      },
      updateOneByIdentifier: {
        method: 'patch',
        path: '/recipe/'
      },
      deleteOneByIdentifier: {
        method: 'delete',
        path: '/recipe/'
      }
    },
    displayedFields: [`name`, `created`],
    model: {
      _id: { type: `String`, identifier: true },
      name: { type: `String` },
      created: { type: `Date` },
      steps: { type: `Json` }
    },
    actions: []
  }
]

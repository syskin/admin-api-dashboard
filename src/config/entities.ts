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
        url: '/users',
        responsePath: 'response.users'
      },
      getOneByIdentifier: {
        method: 'get',
        url: '/user/',
        responsePath: 'response.user'
      },
      updateOneByIdentifier: {
        method: 'patch',
        url: '/user/'
      },
      deleteOneByIdentifier: {
        method: 'delete',
        url: '/user/'
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
        url: '/recipes',
        responsePath: 'response.recipes'
      },
      getOneByIdentifier: {
        method: 'get',
        url: '/recipe/',
        responsePath: 'response.recipe'
      },
      updateOneByIdentifier: {
        method: 'patch',
        url: '/recipe/'
      },
      deleteOneByIdentifier: {
        method: 'delete',
        url: '/recipe/'
      }
    },
    displayedFields: [`name`, `created`],
    model: {
      _id: { type: `String`, identifier: true },
      name: { type: `String` },
      created: { type: `Date` },
      steps: { type: `Json` }
    },
    actions: [
      {
        name: 'Validate recipe',
        method: 'post',
        url: '/recipe/validate/:_id',
        params: ['_id']
      },
      {
        name: 'Refuse recipe',
        method: 'post',
        url: '/recipe/refuse/:_id',
        params: ['_id']
      }
    ]
  }
]

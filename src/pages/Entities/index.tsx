import React from 'react'
import { Link } from 'react-router-dom'
import { entities } from '../../config/entities'

const Entity: React.FC = () => {
  const routes: any[] = []
  entities.forEach((entity) => {
    routes.push({
      name: entity.name,
      path: `/entity/${entity.name.toLowerCase()}`,
      private: true
    })
  })

  return (
    <div>
      <h1>Entities page</h1>
      <div>
        {routes.map((route, index) => {
          return (
            <div key={index}>
              <Link to={route.path}>{route.name}</Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Entity

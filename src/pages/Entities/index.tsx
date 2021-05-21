import React from 'react'
import { Link } from 'react-router-dom'
import { entities } from '../../config/entities'

import './Entities.scss'

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
      <div className="entities-wrapper">
        {routes.map((route, index) => {
          return (
            <div className="entity-wrapper" key={index}>
              <div>
                <Link to={route.path}>
                  <span>{route.name}</span>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Entity

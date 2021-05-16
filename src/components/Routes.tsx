import React from 'react'
import { Switch, Route, useParams, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Entity from '../pages/Entity'
import EntityName from '../pages/Entity/_Name'
import EntityByIdentifier from '../pages/Entity/_ByIdentifier'
import Home from '../pages/Home'
import Login from '../pages/Login'

import { RootState } from '../store'

interface RouteInfo {
  name: string
  path: string
  private: boolean
}

interface EntityName {
  entityName: string
}

interface EntityIdentifier {
  entityName: string
  identifier: string
}

interface Props {
  routes: RouteInfo[]
}

const App: React.FC<Props> = () => {
  const { authenticated } = useSelector((state: RootState) => state.auth)
  if (!authenticated)
    return (
      <div>
        <Route path="/login" component={Login} />
        <Redirect from="*" to="/login" />
      </div>
    )
  else
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/entity" component={Entity} />
          <Route
            path="/entity/:entityName/:identifier"
            component={EntityFormCmpt}
            key={window.location.pathname}
          />
          <Route
            path="/entity/:entityName"
            component={EntityNameCmpt}
            key={window.location.pathname}
          />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    )
}

const EntityNameCmpt: React.FC = () => {
  const { entityName } = useParams<EntityName>()
  return (
    <div>
      <EntityName name={entityName} />
    </div>
  )
}
const EntityFormCmpt: React.FC = () => {
  const { identifier } = useParams<EntityIdentifier>()
  return (
    <div>
      <EntityByIdentifier identifierKey={identifier} />
    </div>
  )
}

export default App

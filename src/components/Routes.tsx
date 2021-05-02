import React from 'react';
import {
  Switch,
  Route,
  useParams,
  Redirect
} from "react-router-dom";
import { useSelector } from 'react-redux';

import Entity from '../pages/Entity'
import EntityName from '../pages/Entity/_Name'
import Home from '../pages/Home'
import Login from '../pages/Login'

import { RootState } from '../store';

interface RouteInfo {
  name: string;
  path: string;
  private: boolean;
}

interface ParamTypes {
  entityName: string;
}

interface Props {
  routes: RouteInfo[];
}

const App: React.FC<Props> = ({ routes }) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);
  if(!authenticated) return(
    <div>
      <Route path="/login" component={Login} />
      <Redirect from='*' to='/login' />
    </div>
  )
  else return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/entity" component={Entity} />
        <Route path="/entity/:entityName" component={EntityNameCmpt} />
        <Redirect from='*' to='/' />
      </Switch>
  </div>
  );
}

const EntityNameCmpt: React.FC = () => {
  const { entityName } = useParams<ParamTypes>();
  return (
    <div>
      <EntityName name={entityName} />
    </div>
  )
}

export default App;

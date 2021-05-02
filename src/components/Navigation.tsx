import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../store/actions/authActions';
import {
  Link,
  useHistory
} from "react-router-dom";

import { RootState } from '../store';

interface RouteInfo {
  name: string;
  path: string;
  private: boolean;
}

interface Props {
  routes: RouteInfo[];
}

const Menu: React.FC<Props> = (props) => {
    const { authenticated } = useSelector((state: RootState) => state.auth);
    return (
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {
          props.routes.map((route: RouteInfo, index: number) => {
          if(authenticated && route.private) {
              return (
                <li key={index}>
                  <Link to={route.path}>{route.name}</Link>
                </li>
              )
            } else if (!route.private && !authenticated) {
              return (
                <li key={index}>
                  <Link to={route.path}>{route.name}</Link>
                </li>
              )
            } else return (null)
            }
          )
        }
        { authenticated ? <LogoutButton /> : null }
      </ul>
    )
}

function LogoutButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutClickHandler = () => {
    dispatch(signout());
    history.push('/login')
  }
  return (
    <button onClick={logoutClickHandler}>Logout</button>
  )
}

export default Menu

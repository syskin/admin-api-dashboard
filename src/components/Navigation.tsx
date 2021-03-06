import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signout } from '../store/actions/authActions'
import { Link, useHistory } from 'react-router-dom'

import { Button, Menu } from 'antd'
import { RootState } from '../store'

interface RouteInfo {
  name: string
  path: string
  private: boolean
}

interface Props {
  routes: RouteInfo[]
}

const Navigation: React.FC<Props> = (props) => {
  const { authenticated } = useSelector((state: RootState) => state.auth)
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[`${window.location.pathname}`]}
    >
      {props.routes.map((route: RouteInfo) => {
        if (
          (authenticated && route.private) ||
          (process.env.REACT_APP_AUTHENTICATION === 'false' && route.private)
        ) {
          return (
            <Menu.Item key={route.path}>
              <Link to={route.path}>{route.name}</Link>
            </Menu.Item>
          )
        } else if (
          !route.private &&
          !authenticated &&
          process.env.REACT_APP_AUTHENTICATION === 'true'
        ) {
          return (
            <Menu.Item key={route.path}>
              <Link to={route.path}>{route.name}</Link>
            </Menu.Item>
          )
        }
        return null
      })}
      {authenticated && process.env.REACT_APP_AUTHENTICATION ? (
        <Menu.Item>
          <LogoutButton />
        </Menu.Item>
      ) : null}
    </Menu>
  )
}

function LogoutButton() {
  const dispatch = useDispatch()
  const history = useHistory()
  const logoutClickHandler = () => {
    dispatch(signout())
    history.push('/login')
  }
  return <Button onClick={logoutClickHandler}>Logout</Button>
}

export default Navigation

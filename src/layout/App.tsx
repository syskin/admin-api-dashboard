import React from 'react'
import Routes from '../components/Routes'
import Navigation from '../components/Navigation'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import 'antd/dist/antd.css'
import './App.scss'

import { Layout } from 'antd'
const { Header, Content, Footer } = Layout

interface RouteInfo {
  name: string
  path: string
  private: boolean
}

interface Props {
  routes: RouteInfo[]
}
const App: React.FC<Props> = ({ routes }) => {
  return (
    <Layout className="layout">
      <Header>
        <Navigation routes={routes} />
      </Header>
      <Content>
        <div className="site-layout-content">
          <Routes routes={routes} />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>React Admin API Dashboard</Footer>
    </Layout>
  )
}

export default App

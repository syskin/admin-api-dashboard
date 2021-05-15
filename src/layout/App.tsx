import React from 'react';

import Routes from '../components/Routes'
import Navigation from '../components/Navigation'
import 'antd/dist/antd.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RouteInfo {
  name: string;
  path: string;
  private: boolean;
}

interface Props {
  routes: RouteInfo[];
}
const App: React.FC<Props> = ({ routes }) => {
  return (
    <div className="App">
      <header className="App-header">
        Header of my admin dashboard
        <Navigation routes={routes} />
      </header>
      <main>
        Main content of admin dashboard connected to any admin API
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
      </main>
    </div>
  );
}

export default App;

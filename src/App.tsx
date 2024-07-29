import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import RouterConfig from './config/RouterConfig';
import { Provider } from 'react-redux';
import { store } from './redux/stores/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <RouterConfig />
      </BrowserRouter>
    </Provider>
  );
};

export default App;

import logo from './logo.svg';
import './App.css';

import json from './build/HflToken.json'
import Content from './views/Content';

import { Provider } from 'react-redux';
import store from './redux/store';
function App() {
  return (
      <Provider store={store}>
        <Content></Content>
      </Provider>
  );
}

export default App;

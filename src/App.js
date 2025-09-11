import logo from './logo.svg';
import './App.css';

import json from './build/HflToken.json'
import Content from './views/Content';

console.log(json)

function App() {
  return (
      <div>
        <Content>Content</Content>
      </div>
  );
}

export default App;

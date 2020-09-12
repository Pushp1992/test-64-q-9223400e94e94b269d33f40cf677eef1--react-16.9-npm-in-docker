import React from 'react';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Routes from './route';
import './App.css';

const history = createHistory();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router history={history}>
          <Routes />
        </Router>
      </header>
    </div>
  );
}

export default App;

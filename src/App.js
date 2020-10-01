import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import OwnHeader from './OwnHeader'
import OwnFooter from './OwnFooter'
import MainContent from './MainContent'
// Redux
import { Provider } from "react-redux"
import { createStore } from "redux"
import allReducers from "./reducers"

// creamos la store
let store = createStore(
  allReducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <header className="App-header">
            <OwnHeader />        
          </header>
          <MainContent />
          <OwnFooter />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
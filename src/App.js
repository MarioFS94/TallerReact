import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import OwnHeader from './OwnHeader'
import OwnFooter from './OwnFooter'
import MainContent from './MainContent'

const App = () => {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <OwnHeader />        
        </header>
        <MainContent />
        <OwnFooter />
      </Router>
    </div>
  );
}

export default App;
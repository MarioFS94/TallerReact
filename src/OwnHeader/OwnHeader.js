import React, { Component } from 'react';
import './OwnHeader.css';
import logo from '../resources/logo.svg';
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom'

const html = (
<div className="header">
  <div>
    <img src={logo} className="App-logo" alt="logo" />
  </div>
  
  {/* <div id="menu" className="bg-secondary">
    <img src={menu} alt="Toggle menu" onClick={ openMenu } />
  </div> */}
  
  <div className="banner">
    <div className="hero-image" onClick={ goAds }>
      <div className="hero-text">
        <p>Learn<br/> Google <br/>Adwords</p>
      </div>
    </div>
  </div>

  <p>
    <Link to="/login" className="App-link">
      Login
    </Link>
    <span> / </span>
    <Link to="/register" className="App-link">
      Sing up
    </Link>
  </p>
</div>);
function openMenu() {
  console.log('Abrir menu');
}
function goAds() {
  alert('ANUNCIO');
}
class OwnHeader extends Component {
  // constructor(props){
    // super(props);
    // this.state = {};
  // }

  // componentWillMount(){}
  componentDidMount(){
    
  }
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}
  
  render() {
    return html;
  }
}

export default OwnHeader;
import React, { Component } from 'react';
import './OwnHeader.css';
import logo from '../resources/logo.svg';
import { Link } from 'react-router-dom'
import userAccount from '../resources/userAccount.svg'
import exit from '../resources/exit.svg'
import { withRouter } from 'react-router-dom'

class OwnHeader extends Component {
  constructor(){
    super();
    this.state = {
      user: {}
    };
  }
  
  componentDidMount(){
    this.toJson();
  }
  
  goAds = () => {
    alert('ANUNCIO');
  }
  toJson = () => {
    if (sessionStorage.getItem('session-credentials') && sessionStorage.getItem('session-credentials') !== '') {
      this.setState({
        user: JSON.parse(sessionStorage.getItem('session-credentials'))
      });
    }
  }
  logout = (e) => {
    e.preventDefault();
    this.setState({
      user: {}
    });
    sessionStorage.removeItem('session-credentials');
  }
  goMainPage = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  }
  render() {
    return (
      <div className="header">
        <div onClick={e => this.goMainPage(e)} style={{cursor: 'pointer'}}>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        
        <div className="banner">
          <div className="hero-image" onClick={ this.goAds }>
            <div className="hero-text">
              <p>Learn<br/> Google <br/>Adwords</p>
            </div>
          </div>
        </div>
        <>
        {
          (this.toJson && sessionStorage.getItem('session-credentials')) ? 
          <div className="userAccess">
            <table>
              <tbody>
                <tr>
                  <td><img src={userAccount} alt={`${this.state.user.name} account`} /></td>
                  <td>
                    {this.state.user.name}
                  </td>
                  <td>
                    <img src={exit} alt="Log Out" onClick={ e => this.logout(e) } id="logout" style={{cursor: 'pointer'}} />                  
                  </td>
                </tr>
              </tbody>  
            </table>
          </div>
           :
          <p className="userAccess">
            <Link to="/login" className="App-link">
              Login
            </Link>
            <span> / </span>
            <Link to="/register" className="App-link">
              Sing up
            </Link>
          </p>
        }
        </>
      </div>
    );
  }
}

export default withRouter(OwnHeader);
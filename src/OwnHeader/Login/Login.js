import React, { Component } from 'react';
import './Login.css';
import {Form, Button} from "semantic-ui-react";
import axios from "axios";
import { withRouter } from 'react-router-dom'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      pass: '',
      storage: false,
      userLogged: [],
      logged: false
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStorage = this.handleChangeStorage.bind(this);
    this.handleChangePwd = this.handleChangePwd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      username: event.target.value     
    });
  }
  handleChangePwd(event) {
    this.setState({
      pass: event.target.value
    });
  }
  handleChangeStorage(event) {
    if (event.target.checked) {
      this.setState({
        storage: event.target.checked
      });
    }
  }

  handleSubmit(event) {    
    
    axios.get('http://localhost:3004/users?name=' + this.state.username).then(result => {
        
        if (result.data.length !== 0) {
          for (const user of result.data) {
            if (this.state.username === user.name) {
              if (this.state.pass === user.pass) {
                this.setState({
                  userLogged: user
                });
                alert('USUARIO LOGUEADO');
                sessionStorage.setItem('session-credentials', JSON.stringify(this.state.userLogged));  
                this.setState({
                  logged: true
                });
                if (this.state.storage) {
                  localStorage.setItem('local-credentials', JSON.stringify(this.state.userLogged)); //ver como recuperarlo en el input si existe
                }
                window.location.reload();
                this.props.history.push('/');
              } else{
                alert('Usuario incorrecto');
              }
            }
          }
        } else {
          alert('Usuario desconocido');
        }
        
      }).catch(e => console.error(e));  
    event.preventDefault();
  }
 
  render() {
    return (
      <div className="login">
        
        <Form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Login</legend>
            <Form.Input
              fluid
              label='Nombre:'
              placeholder='Nombre'
              id='form-input-first-name'
              value={(localStorage.getItem('local-credentials')) ? JSON.parse(localStorage.getItem('local-credentials')).name : this.state.user} 
              onChange={e => this.handleChange(e)} 
            />
            <Form.Input
              fluid
              type='password'
              label='Password:'
              placeholder='Password'
              value={(localStorage.getItem('local-credentials')) ? JSON.parse(localStorage.getItem('local-credentials')).pass : this.state.pass} 
              onChange={e => this.handleChangePwd(e)}
            />
            <Form.Input
              className="chk"
              type='checkbox'
              label='Recordar'         
              onChange={e => this.handleChangeStorage(e)}
            />
            <Button type='submit'>Login</Button>
          </fieldset>
        </Form>

      </div>
    );
  }
}

export default withRouter(Login);
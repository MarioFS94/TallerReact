import React, { Component } from 'react';
import './Login.css';
import {Form, Button} from "semantic-ui-react";
import axios from "axios";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      pass: '',
      storage: false
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
    if (event.target.value === true) {
      this.setState({
        storage: event.target.value
      });
      localStorage.setItem('credentials', this.state.stringify());
    }
    
  }

  handleSubmit(event) {    
    console.log('this.state: ', this.state);
    //this.setState({products: this.state.products.filter(p =>p.name.includes(this.state.value))});
    axios.get('http://localhost:3004/users').then(result => {
        
        for (const user of result.data) {
          if (this.state.username === user.name) {
            console.log('Nombre de usuario correcto.');
            if (this.state.pass === user.pass) {
              console.log('USUARIO LOGUEADO');
            }
          }else{
            alert('Usuario incorrecto');
          }
        }
        console.log(result.data);
      }).catch(e => console.error(e));  
    event.preventDefault();
  }
  //componentDidMount(){}
  // componentWillMount(){}
  // componentWillUnmount(){}
  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render() {
    return (
      <div className="login">

        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            /* error={{ content: 'Please enter your first name', pointing: 'below' }} */
            fluid
            label='Nombre:'
            placeholder='Nombre'
            id='form-input-first-name'
            value={this.state.user} onChange={this.handleChange} 
          />
          <Form.Input
            /* error='Contraseña incorrecta' */
            fluid
            type='password'
            label='Password:'
            placeholder='Password'
            value={this.state.pass} onChange={this.handleChangePwd}
          />
          <Form.Checkbox
            label='Recordar'         
            checked={this.state.storage} onChange={this.handleChangeStorage}               
          />
          <Button type='submit'>Login</Button>
        </Form>

      </div>
    );
  }
}

export default Login;
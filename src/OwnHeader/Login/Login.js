import React, { Component } from 'react';
import './Login.css';
import {Form, Button} from "semantic-ui-react";

class Login extends Component {
  // constructor(props){
    // super(props);
    // this.state = {};
  // }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render() {
    return (
      <div className="login">

        <Form>
          <Form.Input
            error={{ content: 'Please enter your first name', pointing: 'below' }}
            fluid
            label='Nombre:'
            placeholder='Nombre'
            id='form-input-first-name'
          />
          <Form.Input
            error='Contraseña incorrecta'
            fluid
            label='Password:'
            placeholder='Password'
          />
          <Form.Checkbox
            label='Recordar'            
          />
          <Button type='submit'>Login</Button>
        </Form>

      </div>
    );
  }
}

export default Login;
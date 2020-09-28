import React, { Component } from 'react';
import './Register.css';
import {Form, Button} from "semantic-ui-react";

class Register extends Component {
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
      <div className="register">

        <Form>
          <Form.Input
            /* error={{ content: 'Please enter your first name', pointing: 'below' }} */
            fluid
            label='First name'
            placeholder='First name'
            id='form-input-first-name'
          />
          <Form.Input
            /* error='Please enter your last name' */
            fluid
            label='Last name'
            placeholder='Last name'
          />
          <Form.Input
            /* error={{ content: 'Debe contener 1 mayúscula ,1 minúscula, 1 número, 1 carácter especial y una longitud mínima de 8 carácteres', pointing: 'below' }} */
            fluid
            label='Password'
            placeholder='Password'
            id='form-input-first-name'
          />
          <Form.Input
            /* error={{ content: 'Debe contener 1 mayúscula ,1 minúscula, 1 número, 1 carácter especial y una longitud mínima de 8 carácteres', pointing: 'below' }} */
            fluid
            label='Repeat password'
            placeholder='Password'
            id='form-input-first-name'
          />
          <Form.Checkbox
            label='Acepto los términos y las condiciones'
            /* error={{
              content: 'Debes aceptar los términos y las condiciones',
              pointing: 'left',
            }} */
          />
          <Button type='submit'>Registrarme</Button>
        </Form>

      </div>
    );
  }
}

export default Register;
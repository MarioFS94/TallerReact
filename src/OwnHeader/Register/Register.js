import React, { Component } from 'react';
import './Register.css';
import {Form, Button} from "semantic-ui-react";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      pass: '',
      passCheck: '',
      terms: false
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePwd = this.handleChangePwd.bind(this);
    this.handleChangeCPwd = this.handleChangeCPwd.bind(this);
    this.handleChangeTerms = this.handleChangeTerms.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      username: event.target.value     
    });
  }
  handleChangeEmail(event) {
    this.setState({
      email: event.target.value     
    });
  }
  handleChangePwd(event) {
    this.setState({
      pass: event.target.value
    });
  }
  handleChangeCPwd(event) {
    this.setState({
      passCheck: event.target.value
    });
  }
  handleChangeTerms(event) {
    console.log('terms: ', event.target.checked);
    if (event.target.checked) {
      this.setState({
        terms: event.target.checked
      });      
    }    
  }

  handleSubmit(event) {    
    /* let response = axios.get('http://localhost:3004/users');
    console.log('response: ', response);
    let id = response.data.length;
    console.log('id: ', id); */
    const user = {
      //id: id++,
      name: this.state.username,
      email: this.state.email,
      password: this.state.pass
    };
    /* if (this.state.terms) {
      
    } */
    console.log('user: ', user);
    if (this.state.pass === this.state.passCheck) {
      axios.post('http://localhost:3004/users', { user }).then(result => {
        console.log(result);
        alert('REGISTRADO!');
      }).catch(e => console.error(e)); 
    }else{
      alert('Las contraseñas no son iguales');
    }
     
    event.preventDefault();
  }

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

        <Form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Registro</legend>
            <Form.Input
              /* error={{ content: 'Please enter your first name', pointing: 'below' }} */
              fluid
              label='Nombre'
              placeholder='Nombre'
              id='form-input-first-name'
              value={this.state.username} onChange={this.handleChange}
            />
            <Form.Input
              /* error='Please enter your last name' */
              fluid
              type='email'
              label='Email'
              placeholder='micorreo@example.com'
              value={this.state.email} onChange={this.handleChangeEmail}
            />
            <Form.Input
              /* error={{ content: 'Debe contener 1 mayúscula ,1 minúscula, 1 número, 1 carácter especial y una longitud mínima de 8 carácteres', pointing: 'below' }} */
              fluid
              type="password"
              label='Password'
              placeholder='Password'
              value={this.state.pass} onChange={this.handleChangePwd}
            />
            <Form.Input
              /* error={{ content: 'Debe contener 1 mayúscula ,1 minúscula, 1 número, 1 carácter especial y una longitud mínima de 8 carácteres', pointing: 'below' }} */
              fluid
              type="password"
              label='Repeat password'
              placeholder='Password'
              value={this.state.passCheck} onChange={this.handleChangeCPwd}
            />
            <Form.Checkbox
              label='Acepto los términos y las condiciones'
              checked={this.state.terms} onChange={this.handleChangeTerms}
              /* error={{
                content: 'Debes aceptar los términos y las condiciones',
                pointing: 'left',
              }} */
            />
            <Button type='submit'>Registrarme</Button>
          </fieldset>
        </Form>

      </div>
    );
  }
}

export default Register;
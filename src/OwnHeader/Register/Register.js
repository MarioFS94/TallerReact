import React, { Component } from 'react';
import './Register.css';
import {Form, Button} from "semantic-ui-react";
import axios from "axios";
import { connect } from "react-redux"
import { addUser } from "../../actions/actions"

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
    if (event.target.checked) {
      this.setState({
        terms: event.target.checked
      });      
    }    
  }

  handleSubmit(event) {    

    /* const user = {
      name: this.state.username,
      email: this.state.email,
      password: this.state.pass
    }; */
    if (this.state.terms) {    
      if (this.state.pass === this.state.passCheck) {
        axios.post('http://localhost:3004/users', {
          name: this.state.username,
          email: this.state.email,
          password: this.state.pass
        }).then(result => {
          
          if (result.status === 201) {
            this.props.addUser({
              name: this.state.username,
              email: this.state.email,
              password: this.state.pass
            });
            alert('REGISTRADO!');
          } else {
            alert('ERROR, vuelva a intentarlo');
            window.location.reload();
          }
          
        }).catch(e => console.error(e)); 
      }else{
        alert('Las contraseñas no son iguales');
      }
    }else {
      alert('No has aceptado los términos y condiciones de uso');
    }

    event.preventDefault();
  }

  render() {
    return (
      <div className="register">

        <Form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Registro</legend>
            <Form.Input
              fluid
              label='Nombre'
              placeholder='Nombre'
              id='form-input-first-name'
              value={this.state.username} onChange={this.handleChange}
            />
            <Form.Input
              fluid
              type='email'
              label='Email'
              placeholder='micorreo@example.com'
              value={this.state.email} onChange={this.handleChangeEmail}
            />
            <Form.Input
              fluid
              type="password"
              label='Password'
              placeholder='Password'
              value={this.state.pass} onChange={this.handleChangePwd}
            />
            <Form.Input
              fluid
              type="password"
              label='Repeat password'
              placeholder='Password'
              value={this.state.passCheck} onChange={this.handleChangeCPwd}
            />
            <Form.Input
              label='Acepto los términos y las condiciones'
              className="chk"
              type='checkbox'
              onChange={e => this.handleChangeTerms(e)}              
            />
            <Button type='submit'>Registrarme</Button>
          </fieldset>
        </Form>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
})

const mapDispatchToProps = {
  addUser
}

export default connect(mapStateToProps, mapDispatchToProps) (Register);
//export default connect(mapStateToProps, { addUser }) (Register);
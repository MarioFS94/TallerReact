import React, { Component } from 'react';
import './Product.css';
import { withRouter } from 'react-router-dom'
import {
  Card,
  Image,
} from 'semantic-ui-react'
import axios from "axios";

class Product extends Component {

  constructor(){
    super();
    this.state = {
      product: []
    };
  }

  componentDidMount(){
    axios.get('http://localhost:3004/items/'+ this.props.location.state.id).then(res => {
      this.setState({product: res.data });
    });
  }

  addCesta = (id) => {

    axios.post('http://localhost:3004/cesta', {item: id, cantidad: 1}).then( message => {       
      if (message.status === 201) {
        alert('Producto añadido a la cesta'); 
      }
    });
  };

  render() {
    return (
      <div className="product mb-4">
        <Card centered key={this.state.product.id}>
          <Image src={this.state.product.image} alt={this.state.product.name} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{this.state.product.name}</Card.Header>
            <Card.Meta>                
              {
                this.state.product.oferta && 
                <div>
                  <span>OFERTA!</span>
                  <span>Descuento del {this.state.product.porc} %</span>
                </div>
              }
              <span className='date'>Lo recibirás en 24h</span>
            </Card.Meta>
            <Card.Description>
              {this.state.product.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <>
              {
                this.state.product.oferta && <><span id="oldPrice">{this.state.product.price}</span> <span id="arrowLeft"></span></>
              }                  
              { this.state.product.oferta ? this.state.product.price - (this.state.product.price * (this.state.product.porc / 100)) : this.state.product.price } €
              <button id="addItem" className="btn btn-primary" onClick={() => this.addCesta(this.state.product.id)}>+</button>
            </>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default withRouter(Product);
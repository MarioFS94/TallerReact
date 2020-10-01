import React, { Component } from 'react';
import './Product.css';
import { withRouter } from 'react-router-dom'
import {
  Card,
  Image,
} from 'semantic-ui-react'
import axios from "axios";
import carrito from '../../../../resources/carrito.svg'

class Product extends Component {

  constructor(){
    super();
    this.state = {
      product: [],
      cesta: [],
      products: [],
      listProds: [],
      total: 0
    };
  }

  componentDidMount(){
    axios.get('http://localhost:3004/items/'+ this.props.location.state.id).then(res => {
      this.setState({product: res.data });
    });

    this.dataCesta();
  }

  dataCesta = () => {
    axios.get('http://localhost:3004/cesta').then(res => {
      this.setState({
        cesta: res.data
      });

      axios.get('http://localhost:3004/items').then(result => {
        this.setState({
          products: result.data
        });

        let itemsID = [];
        for (const item of this.state.cesta) {
          //Guarda los IDs de los productos de la cesta en un vector
          itemsID.push(item.item);
        }

        let list = [];
        for (const product of this.state.products) {
          for (let index = 0; index < itemsID.length; index++) {
            if (itemsID[index] === product.id) {
              //Compara los IDs que contiene la cesta con los de todos los productos y mete los productos de la cesta en una lista
              list.push(product);
            }
          }
        }
        this.setState({ listProds: list });
        
        //calcula el precio total con la cantidad a comprar de cada producto
        for (const item of this.state.cesta) {
          for (const prod of list) {
            if (item.item === prod.id) {
              this.setState({
                total: this.state.total + (prod.price * item.cantidad)
              });
            }
          }
        }        
      });
    });
  }
  addCesta = (id) => {

    axios.post('http://localhost:3004/cesta', {item: id, cantidad: 1}).then( message => {       
      if (message.status === 201) {
        alert('Producto añadido a la cesta'); 
      }
    });
  };
  goCesta = () => {
    this.props.history.push("/cesta");
  };

  render() {
    return (
      <div className="product mb-4">
        <div id="carritoProd" onClick={this.goCesta}>
          <div className="d-flex ml-4">
            <img src={carrito} alt="carrito de la compra"/>
            <span className="ml-2"><h5>Cesta</h5></span>
          </div>
          <hr />
          {
            this.state.listProds.map(p => (
              <p key={p.id}>                
                {
                  this.state.cesta.map(pc => (
                    pc.item === p.id &&
                    <span key={pc.id}>{pc.cantidad}</span>
                  ))
                }                
                <span>&nbsp;x&nbsp;</span>
                <span>{p.name}</span>
              </p>              
            ))
          }
          <hr />
          <p><strong>Total</strong>:&nbsp; {this.state.total} &nbsp; €</p>
          <button className="btn btn-primary w-100" onClick={this.goCesta}>Ver cesta</button>
        </div> 

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
                this.state.product.oferta && 
                <>
                  <span id="oldPrice">{this.state.product.price}</span>&nbsp;
                  <span id="arrowLeft"></span>&nbsp;
                </>
              }
              { this.state.product.oferta ? this.state.product.price - (this.state.product.price * (this.state.product.porc / 100)) : this.state.product.price } €
              <button id="addItem" variant="success" className="btn btn-primary" onClick={() => this.addCesta(this.state.product.id)}>+</button>            
            </>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default withRouter(Product);
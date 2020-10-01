import React from 'react';
import './Oferts.css';
import {
  Form,
  Button,
  Card,
  Image,
} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import carrito from '../../../resources/carrito.svg'
import { connect } from "react-redux"
import { addCesta } from "../../../actions/actions"

class Oferts extends React.Component {  
  
  constructor() {
    super();
    this.state = {
      value: '',
      products: [],//this.props.products
      cesta: 0,
      searched: false,
      loading: false,//controlar entre llamadas axios lo que tarda en traer los datos del server
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addCesta = (id) => {
    axios.post('http://localhost:3004/cesta', {item: id, cantidad: 1}).then( message => {       
      if (message.status === 201) {
        alert('Producto añadido a la cesta'); 
        this.props.addCesta({item: id, cantidad: 1});
      } else {
        alert('ERROR al añadir producto a la cesta.');
      }
    });
  };

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {    
    this.setState({searched: true});
    this.setState({products: this.state.products.filter(p =>p.name.includes(this.state.value))});
    event.preventDefault();
  }
  componentDidMount(){

    axios.get('http://localhost:3004/items?oferta=true').then(result => {
        
        this.setState({
          products: result.data
        })
        
      }).catch(e => console.error(e));  
    axios.get('http://localhost:3004/cesta').then( res => {       
        this.setState({cesta: res.data.length});
      });
  }
  goCesta = () => {
    this.props.history.push("/cesta");
  };
  goItem = (id) => {
    this.props.history.push("/product", {id: id});
  };
  render(){
    return (
      <div id="oferts">
        <header>
          Ofertas
        </header>
        <div className="productSearch">
          <Form onSubmit={this.handleSubmit} className="searchForm">
            <Form.Field inline>
              <input placeholder="Producto a buscar..." value={this.state.value} onChange={this.handleChange} />
              <Button>Search</Button>
            </Form.Field>
          </Form>
          <div id="carrito" onClick={this.goCesta}>
            <img src={carrito} alt="carrito de la compra"/><span>{this.state.cesta}</span>
          </div>
        </div>
    
        <Card.Group centered id="cards" className="mb-5">
          {
            (this.state.products && this.state.products.length !== 0) ?
            this.state.products.map((product) => (
              <Card key={product.id}>
                <Image src={product.image} alt={product.name} wrapped ui={false} onClick={() => this.goItem(product.id)} />
                <Card.Content onClick={() => this.goItem(product.id)}>
                  <Card.Header>{product.name}</Card.Header>
                  <Card.Meta>                
                    {
                      product.oferta && 
                      <div>
                        <span>OFERTA!</span>
                        <span>Descuento del {product.porc} %</span>
                      </div>
                    }
                    <span className='date'>Lo recibirás en 24h</span>
                  </Card.Meta>
                  <Card.Description>
                    {product.description}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <>
                    { product.oferta && <><span id="oldPrice">{product.price}</span>&nbsp;<span id="arrowLeft"></span>&nbsp;</> }                    
                    { product.oferta ? product.price - (product.price * (product.porc / 100)) : product.price } €
                    <button id="addItem" className="btn btn-primary" onClick={() => this.addCesta(product.id)}>+</button>
                  </>
                </Card.Content>
              </Card>
            )) : (<Card>
              <Card.Content>
                <Card.Header>No hay productos</Card.Header>
                <Card.Content extra>Asegurate de que json server está arrancado (npm run json)</Card.Content>
              </Card.Content>              
            </Card>)
          }
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  prod: state.cesta,
})

const mapDispatchToProps = {
  addCesta
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Oferts));
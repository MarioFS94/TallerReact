import React from 'react';
import './Oferts.css';
import {
  Form,
  Button,
  Card,
  Image,
} from 'semantic-ui-react'
import axios from 'axios'

class Oferts extends React.Component {  
  
  constructor(props) {
    super(/* props */);
    this.state = {
      value: '',
      products: [],//this.props.products
      searched: false
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
    
  }
  render(){
    return (
      <>
        
        <Form onSubmit={this.handleSubmit} className="searchForm">
          <Form.Field inline>
            <input placeholder="Producto a buscar..." value={this.state.value} onChange={this.handleChange} />
            <Button>Search</Button>
          </Form.Field>
        </Form>
    
        <Card.Group centered id="cards">
          {
            this.state.products.map((product) => (
              <Card key={product.id}>
                <Image src={product.image} alt={product.name} wrapped ui={false} />
                <Card.Content>
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
                  {
                    product.oferta && <><span id="oldPrice">{product.price}</span> <span id="arrowLeft"></span></>
                  }
                  
                  { product.oferta ? product.price - (product.price * (product.porc / 100)) : product.price } €
                  
                </Card.Content>
              </Card>
            ))
          }
        </Card.Group>
      </>
    );
  }
}
export default Oferts;
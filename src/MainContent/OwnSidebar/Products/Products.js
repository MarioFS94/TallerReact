import React from 'react';
import './Products.css';
import {
  Card,
  Image,
} from 'semantic-ui-react'

const Products = (props) => {  
  
  return (
    <Card.Group centered id="cards">
      {
        props.products.map((product) => (
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
              <a>
                { product.oferta ? product.price * (product.porc / 100) : product.price } €
              </a>
            </Card.Content>
          </Card>
        ))
      }
    </Card.Group>
  );
}

export default Products;
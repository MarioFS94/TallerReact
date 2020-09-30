import React, { Component } from 'react';
import './Cesta.css';
import axios from "axios";
import { withRouter } from 'react-router-dom'

class Cesta extends Component {
  constructor() {
    super();
    this.state = {
      cesta: [],
      products: [],
      listProds: [],
      total: 0
    };
  }

  // componentWillMount(){}
  componentDidMount() {

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
        console.log('STATE: ', this.state);
      });
    });
  }
  // componentWillUnmount(){}
  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}
  bought = (e) => {
    e.preventDefault();
    alert('Comprado');
  };
  goProducts = (e) => {
    e.preventDefault();
    this.props.history.push("/products");    
  };
  render() {
    return (
      <div className="cesta mx-auto" style={{ width: 'max-content' }}>
        <div className="container center">
          <div className="row">
            <div className="col-xs-8">
              <div className="panel panel-info">
                <div className="panel-heading mb-5">
                  <div className="panel-title">
                    <div className="row">
                      <div className="col font-weight-bold">
                        <h1>Cesta</h1>
                      </div>
                      <div className="col justify-content-end">
                        <button type="button" className="btn btn-primary btn-sm btn-block " style={{ width: 'max-content' }} onClick={(e) => this.goProducts(e)}>
                          <span className="glyphicon glyphicon-share-alt" ></span> Continuar comprando
                        </button>
                      </div>
                    </div>
                    
                  </div>
                </div> {/** panel-heading */}
                {
                  this.state.listProds.map((prod) =>
                    (
                      <div className="panel-body" key={prod.id}>
                        <div className="row">
                          <div className="col-xs-2">
                            <img className="img-responsive" src={prod.image} alt={prod.name} style={{ width: '70px' }} />
                          </div>
                          <div className="col-xs-4 mr-4 ml-4">
                            <h4 className="product-name"><strong>{prod.name}</strong></h4><h5>{prod.description}</h5>
                          </div>
                          <div className="col-xs-6">
                            <div className="col-xs-6 text-right">
                              <h6><strong>{prod.price} <span className="text-muted">x</span></strong></h6>
                            </div>
                            <div className="col-xs-4">
                              {
                                this.state.cesta.map((prodCesta) =>(
                                  prodCesta.item === prod.id &&
                                    <input type="text" className="form-control input-sm" value={prodCesta.cantidad} key={prodCesta.id} readOnly />                                  
                                ))
                              }
                            </div>
                            <div className="col-xs-2">
                              <button type="button" className="btn btn-link btn-xs">
                                <span className="glyphicon glyphicon-trash"> </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <hr />
                        
                      </div>
                    ))
                }
                <div className="panel-footer mb-4">
                  <div className="row text-center">
                    <div className="col">
                      <h4 className="text-right">Total <strong>{this.state.total} €</strong></h4>
                    </div>
                    <div className="col-md-3 ml-5">
                      <button type="button" className="btn btn-success btn-block" onClick={(e) => this.bought(e)}>
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Cesta);
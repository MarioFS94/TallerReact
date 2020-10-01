import React, { Component } from 'react';
import OwnSidebar from './OwnSidebar'
import './MainContent.css';
//import axios from 'axios'

class MainContent extends Component {
  
  constructor(){
     super();
     this.state = {
       products: []
     };
   }

  /* componentDidMount(){
    axios.get('http://localhost:3004/items').then(result => {
        this.setState({
          products: result.data.filter(product => product.oferta)
        })
        this.prod =result.data.filter(product => product.oferta);
      }).catch(e => console.error(e));
  } */

  render() {
    return (
      <div id="main-content">
        <OwnSidebar /* products={this.state.products} *//>        
      </div>
    );
  }
}

export default MainContent;
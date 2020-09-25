import React, { Component } from 'react';
import OwnSidebar from './OwnSidebar'
import './MainContent.css';
import axios from 'axios'

class MainContent extends Component {
   constructor(){
     super();
     this.state = {
       products: []
     };
   }

  // componentWillMount(){}
  componentDidMount(){
    axios.get('http://localhost:3004/items').
      then(result => {
        
        this.setState({
          products: result.data
        })
        
      }).catch(e => console.error(e));
      
  }
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render() {
    return (
      <div id="main-content">
        <OwnSidebar products={this.state.products}/>        
      </div>
    );
  }
}

export default MainContent;
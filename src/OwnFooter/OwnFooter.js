import React, { Component } from 'react';
import './OwnFooter.css';

class Footer extends Component {
  // constructor(props){
    // super(props);
    // this.state = {};
  // }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render() {
    return (
      <div className="footer">
        <table>
          <thead>
            <tr>
              <th>Contactanos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>mariofernandezs1@gmail.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Footer;
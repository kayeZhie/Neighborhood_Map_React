import React, { Component } from 'react';
import './App.css';
import SquareAPI from './API/foursquareAPI'

 class App extends Component {
 	componentDidMount() {
 		SquareAPI.search({
 			near:"San Francisco,CA", 
 			query: "pizza",
 			limit: 6
 		}).then(results => console.log(results));

 	}
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}
 export default App;
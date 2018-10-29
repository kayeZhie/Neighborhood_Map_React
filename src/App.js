import React, {Component} from 'react';
import locations from './data/List.json';
import PresentMap from './components/showMap';

class App extends Component {
  state = {
    lat: 37.6305,
    lon: -122.4111,
    zoom: 13,
    all: locations
  }

  render = () => {
    return (
      <div className="App">
        <PresentMap
          lat={this.state.lat}
          lon={this.state.lon}
          zoom={this.state.zoom}
          locations={this.state.all}/>
      </div>
    );
  }
}

export default App;
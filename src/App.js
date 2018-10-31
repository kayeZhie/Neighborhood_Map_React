import React, {Component} from 'react';
import locations from './data/List.json';
import PresentMap from './components/showMap';
import SquareAPI from './API/foursquare'

class App extends Component {
componentDidMount() {
        fetch('https://api.foursquare.com/v2/venues/search?client_id=52WWWVIBTJFWH34X3CEPOFOO5420AZWISHUPMSDQIITR5Y3B&client_secret=BHSSTVQJDWVVIIWMN3BMAOLZ0SSBMILOFPG1RCBAVVJUKFDK&v=20181023&near=San Bruno,CA&query=Filipinorestaurant&limit=10')
        .then(res => res.json())
        .then(data => console.log(data.response));     
  }

  state = {
    lat: 37.6305,
    lon: -122.4111,
    zoom: 13,
    all: locations,
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
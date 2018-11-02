import React, { Component } from "react";
import LocationList from "./components/showMap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: "",
      alllocations: require("./data/List.json"),
      infowindow: "",
      prevmarker: ""
    };

    this.initMap = this.initMap.bind(this);
    this.openInfoWindow = this.openInfoWindow.bind(this);
    this.closeInfoWindow = this.closeInfoWindow.bind(this);
  }

  componentDidMount() {
    // invoking Google Map
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    loadMapJS(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBfILJE96LCdRo_Pkb-IFQQXBaU_zYBdio&callback=initMap"
    );
  }


  //Initialise the map 
  initMap() {
    var self = this;
    var mapview = document.getElementById("map");
    mapview.style.height = window.innerHeight + "px";
    var map = new window.google.maps.Map(mapview, {
      center: { lat: 37.598546, lng: -122.3871942 },
      zoom: 14,
      mapTypeControl: false,

      //styles from https://snazzymaps.com/style/31/red-hues
      styles: [
    {
        "stylers": [
            {
                "hue": "#dd0d0d"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    }
]
    });

    var InfoWindow = new window.google.maps.InfoWindow({});

    window.google.maps.event.addListener(InfoWindow, "closeclick", function() {
      self.closeInfoWindow();
    });

    this.setState({
      map: map,
      infowindow: InfoWindow
    });

    window.google.maps.event.addDomListener(window, "resize", function() {
      var center = map.getCenter();
      window.google.maps.event.trigger(map, "resize");
      self.state.map.setCenter(center);
    });

    window.google.maps.event.addListener(map, "click", function() {
      self.closeInfoWindow();
    });

    var alllocations = [];
    this.state.alllocations.forEach(function(location) {
      var icon = {url: 'https://png.icons8.com/color/50/000000/place-marker.png'};
      var longname = location.name + " " + location.type;
      var marker = new window.google.maps.Marker({ 
        position: new window.google.maps.LatLng(
          location.latitude,
          location.longitude
        ),
        animation: window.google.maps.Animation.DROP,
        map: map,
        icon: icon

      });

      marker.addListener("click", function() {
        self.openInfoWindow(marker);
      });

      location.longname = longname;
      location.marker = marker;
      location.display = true;
      alllocations.push(location);
    });
    this.setState({
      alllocations: alllocations
    });
  }


   //Open the infowindow for the marker
   // @param {object} location marker

  openInfoWindow(marker) {
    this.closeInfoWindow();
    this.state.infowindow.open(this.state.map, marker);
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    this.setState({
      prevmarker: marker
    });
    this.state.infowindow.setContent();
    this.state.map.setCenter(marker.getPosition());
    this.state.map.panBy(0, -200);
    this.getMarkerInfo(marker);
  }

  
  // Retrive the location data from the foursquare api
   
  getMarkerInfo(marker) {
    var self = this;

    // FourSquare key
    var clientId = "52WWWVIBTJFWH34X3CEPOFOO5420AZWISHUPMSDQIITR5Y3B";
    var clientSecret = "BHSSTVQJDWVVIIWMN3BMAOLZ0SSBMILOFPG1RCBAVVJUKFDK";

    // API Information
    var url =
      "https://api.foursquare.com/v2/venues/search?client_id=" +
      clientId +
      "&client_secret=" +
      clientSecret +
      "&v=20130815&ll=" +
      marker.getPosition().lat() +
      "," +
      marker.getPosition().lng() +
      "&limit=1";
    fetch(url)
      .then(function(response) {
        if (response.status !== 200) {
          self.state.infowindow.setContent("Sorry data can't be loaded");
          return;
        }

        // Get info in the response
        response.json().then(function(data) {
          console.log(data);

          var location_data = data.response.venues[0];
          var place = `<h3>${location_data.name}</h3>`;
          var street = `<p>${location_data.location.formattedAddress[0]}</p>`;
          var contact = "";
          if (location_data.contact.phone)
            contact = `<p><small>${location_data.contact.phone}</small></p>`;

          var readMore =
            '<a href="https://foursquare.com/v/' +
            location_data.id +
            '" target="_blank">click here to get <b>Foursquare Information</b></a>';
          self.state.infowindow.setContent(
            place + street + contact + readMore
          );
        });
      })
      .catch(function(err) {
        self.state.infowindow.setContent("Sorry no data found");
      });
  }

  /**
   * Close the info window previously opened
   *
   * @memberof App
   */
  closeInfoWindow() {
    if (this.state.prevmarker) {
      this.state.prevmarker.setAnimation(null);
    }
    this.setState({
      prevmarker: ""
    });
    this.state.infowindow.close();
  }

   // Render for react
  render() {
    return (
      <div>
        <LocationList
          key="100"
          alllocations={this.state.alllocations}
          openInfoWindow={this.openInfoWindow}
          closeInfoWindow={this.closeInfoWindow}
        />
        <div id="map" />
      </div>
    );
  }
}

export default App;
function loadMapJS(src) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.onerror = function() {
    document.write("Google Maps can't be loaded");
  };
  ref.parentNode.insertBefore(script, ref);
}
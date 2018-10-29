import React, {Component} from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

class PresentMap extends Component {
    state = {
        //map display
        map: null,
        //list of all the markers
        markers: [],
        //wether or not the infoWindwo is showing
        showingInfoWindow: false
    };

    componentDidMount = () => {
    }

    mapReady = (props, map) => {
        // Save the map reference in state and prepare the location markers
        this.setState({map});
        //passing all the location marker to the map
        this.updateMarkers(this.props.locations);
    }

    closeInfoWindow = () => {
        // Disable any active marker animation
        this.state.activeMarker && this
            .state
            .activeMarker
            .setAnimation(null);
        this.setState({showingInfoWindow: false, activeMarker: null, activeMarkerProps: null});
    }

    onMarkerClick = (props, marker, e) => {
        // Close any info window already open
        this.closeInfoWindow();

        // Set the state to have the marker info show
        this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps: props});
    }

    updateMarkers = (locations) => {
        // checking all the locations has a valid value or not then it will cause an error
        if (!locations) 
            return;
        
        // remove existing markes from the map
        this
            .state
            .markers
            .forEach(marker => marker.setMap(null));

        // iterate the markers, pass the value of the location and url
        let markerProps = [];
        let markers = locations.map((location, index) => {
            let tempProps = {
                key: index,
                index,
                name: location.name,
                position: location.pos,
                url: location.url
            };
            markerProps.push(tempProps);

            let animation = this.props.google.maps.Animation.DROP;
            let marker = new this.props.google.maps.Marker({
                position: location.pos, 
                map: this.state.map, 
                animation
            });
            marker.addListener('click', () => {
                this.onMarkerClick(tempProps, marker, null);
            });
            return marker;
        })

        this.setState({markers, markerProps});
    }

    render = () => {
        const style = {
            width: '100%',
            height: '100%'
        }
        const center = {
            lat: this.props.lat,
            lng: this.props.lon
        }
        let tempProps = this.state.activeMarkerProps;

        return (
            <Map
                role="application"
                aria-label="map"
                onReady={this.mapReady}
                google={this.props.google}
                zoom={this.props.zoom}
                style={style}
                initialCenter={center}
                onClick={this.closeInfoWindow}>
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.closeInfoWindow}>
                    <div>
                        <h3>{tempProps && tempProps.name}</h3>
                        {tempProps && tempProps.url
                            ? (
                                <a href={tempProps.url}>See website</a>
                            )
                            : ""}
                        
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBfILJE96LCdRo_Pkb-IFQQXBaU_zYBdio")
})(PresentMap)
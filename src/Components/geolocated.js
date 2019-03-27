import React from 'react';
import App from '../App';
import {geolocated} from 'react-geolocated';
 
class GeoTracking extends React.Component {
  render() {
    return !this.props.isGeolocationAvailable
      ? <App />
      : !this.props.isGeolocationEnabled
        ? <App />
        : this.props.coords
          ? <App longitude={this.props.coords.longitude} latitude={this.props.coords.latitude} />
          : <div><h1>Asking the NSA for your current position...</h1> 
          <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div> </div>;
  }
}
 
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GeoTracking);
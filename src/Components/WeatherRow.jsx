import React from 'react'
import Forecast from './Forecast';

export default class WeatherRow extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="scrollers">
                <div className="gravitas" onClick={this.props.handleLeftClick}><img src={require('../img/leftarrow.svg')} alt="Left"/> Scroll</div>
                <div className="border"></div>
                <div className="gravitas" onClick={this.props.handleRightClick}>Scroll <img src={require('../img/rightarrow.svg')} alt="Right"/></div>
                </div>
                <div className="weatherRow" id="weatherRow">
                {this.props.currentForecast ? <Forecast currentForecast={this.props.currentForecast} /> : null}
                </div>
            </React.Fragment>
        )
    }
}

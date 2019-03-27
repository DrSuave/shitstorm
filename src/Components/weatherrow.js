import React from 'react'
import Forecast from './forecast';



class WeatherRow extends React.Component {

    //handle left and right click take care of horizontal scrolling on the weather forecast section. The CSS 'scroll-behavior: smooth;' makes this nice and juicy
    handleRightClick() {
        let scrollDistance = window.outerWidth/2;
        document.getElementById('weatherRow').scrollLeft += scrollDistance;
    }

    handleLeftClick() {
        let scrollDistance = window.outerWidth/2;
        document.getElementById('weatherRow').scrollLeft -= scrollDistance;
    }

    render() {

        return (
            <React.Fragment>
                <div className="scrollers">
                <div className="gravitas" onClick={this.handleLeftClick}><img src={require('../img/leftarrow.svg')} alt="Left"/> Scroll</div>
                <div className="border"></div>
                <div className="gravitas" onClick={this.handleRightClick}>Scroll <img src={require('../img/rightarrow.svg')} alt="Right"/></div>
                </div>
                <div className="weatherRow" id="weatherRow">
                {this.props.currentForecast ? <Forecast currentForecast={this.props.currentForecast} /> : null}
                </div>
            </React.Fragment>
        )
    }
}


export default WeatherRow

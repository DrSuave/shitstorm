import React from 'react'


class Now extends React.Component {

    render() {

        return (
            <div className="now">
                <div className="weatherTile white">
                <p className="gravitas">
                Now
                </p>
                <img src={"//openweathermap.org/img/w/" + this.props.icon + ".png"} alt="Decorative Image"/>
                <h1>{this.props.temperature}°</h1>
                <p className="gravitas">{this.props.description}.</p>

                <img 
                        className="windArrow" 
                        src={require('../img/arrow.svg')} 
                        style={{transform: `rotate(${this.props.windDeg}deg)`, 
                        width: `20px`}}
                        alt={'Wind Angle: ' + this.props.windDeg + ' degrees.'} 
                    />
                    <p className="gravitas">Wind speed: {this.props.windSpeed}mph</p>
                    <div className="sunsetGraph">
                        <div className="sun" style={{marginRight: `${this.props.daylightLeft}%`}}></div>
                    </div>
                    <p className='gravitas sunsetCaption'>
                        <div className="SunriseTime">Sunrise: {this.props.sunrise}</div>
                        <div className="sunsetDivider"> - </div>
                        <div className="SunsetTime">Sunset: {this.props.sunset}</div> 
                    </p>
                </div>
                <div className="messages">
                <h1>{this.props.message}</h1>
                <h4>{this.props.subMessage}</h4>
                </div>
            </div>
        )
    }
}


export default Now

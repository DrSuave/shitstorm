import React from 'react'


class Forecast extends React.Component {

    humanReadable = () => {
        let i = 0;
            this.props.currentForecast.list.map(item => {
                //Human readable time
                let secondsSinceEpoch = this.props.currentForecast.list[i].dt;
                let date = new Date(secondsSinceEpoch * 1000);
                let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                let day = days[date.getUTCDay()];
                let utcHour = date.getUTCHours();
                let hour = '000'
                if (utcHour > 12) {
                     hour = utcHour - 12;
                    hour = hour + "pm";
                }
                else {
                    if (utcHour === 12)  {
                         hour = utcHour + "pm"
                    }
                    else {
                        if (utcHour === 0) {
                            utcHour = 12;
                        }
                         hour = utcHour + "am"
                    }
                }
                //let dateStr = [day, hour].join(" "); 
                //this.props.currentForecast.list[i].dt = dateStr;
                this.props.currentForecast.list[i].dt = day;
                this.props.currentForecast.list[i].sys.pod = hour;
                
                //human readable temp
                let humanTemp = Math.floor(item.main.temp);
                humanTemp = humanTemp + '°'
                this.props.currentForecast.list[i].main.temp = humanTemp;
                //meters per second to MPH
                let imperialWind = Math.floor(this.props.currentForecast.list[i].wind.speed *  2.237);
                this.props.currentForecast.list[i].wind.speed = imperialWind;

                i++;
                this.forceUpdate();
            })
    }


    componentDidUpdate(prevProps) {
        if (this.props.currentForecast.list[0].dt !== prevProps.currentForecast.list[0].dt) {
            this.humanReadable();
        }
    }
    componentDidMount() {
        this.humanReadable();
    }

    
    render() {
            return (
                this.props.currentForecast.list.map(item => (                 
                    <div className="weatherTile" key={item.dt_txt} >
                        <p className="gravitas thick">{item.sys.pod}</p>
                        <p className="gravitas day">{item.dt}</p>
                        <p className="thick judgement">{item.weather[0].icon === '01d' ? "Fuckin' Lush" : item.weather[0].icon === '01n' ? 'STARFACE' : item.weather[0].icon === '02d' ? 'Decent' : item.weather[0].icon === '02n' ? 'Decent' : item.weather[0].icon === '03d' ? 'Could be shitter' : item.weather[0].icon === '03n' ? 'Could be shitter' : item.weather[0].icon === '04d' ? 'A bit bollocks' : item.weather[0].icon === '04n' ? 'Dull as fuck' : item.weather[0].icon === '09d' ? 'shite': item.weather[0].icon === '09n' ? 'shite' : item.weather[0].icon === '10d' ? 'crap': item.weather[0].icon === '10n' ? 'crap' : item.weather[0].icon === '11d' ? 'Kapow!': item.weather[0].icon === '11n' ? 'Kapow!' : item.weather[0].icon === '13d' ? 'FUCKING SNOW!': item.weather[0].icon === '13n' ? 'FUCKING SNOW!' : 'FUCKING MIST'}</p>
                        <img src={"//openweathermap.org/img/w/" + item.weather[0].icon + ".png"} alt='Decorative Image'/>
                        <p className="thick judgement">{item.main.temp}</p>
                        <p className="gravitas">{item.weather[0].description}</p>
                        <img 
                            className="windArrow" 
                            src={require('../img/arrow.svg')} 
                            style={{transform: `rotate(${item.wind.deg}deg)`, 
                            width: `20px`}} 
                         alt={"Wind angle " + item.wind.deg + " degrees."} />
                        <p className="gravitas">{item.wind.speed}mph</p>
                    </div>
                ))
            )
    }
}

export default Forecast



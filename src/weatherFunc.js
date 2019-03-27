import ReactGA from 'react-ga';
import {Api_Key} from './key.js';

export let location = '';

//this function is triggered when OpenWeather responds to the first of our two API calls
export function onResponse() {
    //first we want to figure out when the sun rises today. To do that, we start by converting the date from seconds sinve 1970 to milliseconds since 1970
    let sunriseSinceEpoch = new Date(this.state.response.sys.sunrise * 1000);
    //then we convert that value to UTC time, first with the hour, then with the minute
    let sunriseHour = sunriseSinceEpoch.getUTCHours();
    let sunriseMinute = sunriseSinceEpoch.getUTCMinutes();
    //if the minute is less than 10, we stick a 0 in front of it
    sunriseMinute < 10 ? sunriseMinute = '0' + sunriseMinute : sunriseMinute = sunriseMinute;
    //then we join the two
    let humanSunrise = sunriseHour + ':' + sunriseMinute + 'AM';
    //then we repeat the above, but with sunset
    let sunsetSinceEpoch = new Date(this.state.response.sys.sunset * 1000);
    let sunsetHour = sunsetSinceEpoch.getUTCHours();
    //we don't want a 24hr clock, so minusing 12 from the sunset hour
    sunsetHour = sunsetHour - 12;
    let sunsetMinute = sunsetSinceEpoch.getUTCMinutes();
    sunsetMinute < 10 ? sunsetMinute = '0' + sunsetMinute : sunsetMinute = sunsetMinute;
    //now we figure out what percentage of the day is left until sunset
    let currentTime = new Date();
    let a = sunsetSinceEpoch - currentTime;
    let c = sunsetSinceEpoch - sunriseSinceEpoch;
    let n =  a / c * 100;
    //n is percentage of daylight left - this should be the CSS margin-right value of the sun if A is smaller than C - see now.js in the components folder
    let humanSunset = sunsetHour + ':' + sunsetMinute + 'PM';
    if(this.state.city && this.state.country){
      //this is a CSS workaround - margin-right: 97% warps the sun div, so the state.daylightLeft value has a maximum of 96
      if (n <= 96) {
        this.setState({
          daylightLeft: n
        })
        if (n <= 0) { // make sure we don't have the sun creep off the graph after sunset
          this.setState({
            daylightLeft: 0
          })
        }
      }
      else {
        this.setState({
          daylightLeft: 96
        })
      }
      //now we set state with the rest of the info sent from the API
      this.setState({
        temperature: Math.round(this.state.response.main.temp),
        city: this.state.response.name,
        country: this.state.response.sys.country,
        sunset: humanSunset,
        sunrise: humanSunrise,
        humidity: this.state.response.main.humidity,
        description: this.state.response.weather[0].description,
        icon: this.state.response.weather[0].icon,
        error: "",
        windSpeed: this.state.response.wind.speed,
        windDeg: this.state.response.wind.deg,
      })
      ReactGA.pageview(this.state.city + this.state.country);
      //here we write our sweary messages based on the weather. The method is relatively crude, drawing the bulk of the info from the icon. Over time temperature and windspeed could finetune these messages.

      if (this.state.icon === '01d') {
        if (this.state.temp > 15) {
          this.setState({
            message: 'Fucking Lush',
            subMessage: "If you had friends you could go outside and play!"
          })
        } else {
          this.setState({
            message: 'Pretty, but disappointingly cold.',
            subMessage: "Like you, except it's pretty."
          })
        }
      }

      if (this.state.icon === '01n') {
        this.setState({
          message: 'Starry motherfucker',
          subMessage: "We are all in the gutter, but some of us are looking at the stars. You're just in the gutter."
        })
      }

      switch (this.state.icon) {
        case '02d' :
        case '02n' :
        this.setState({
          message: 'Not too shite.',
          subMessage: "Unlike you. You're really shite."
        })
        if (this.state.temp < 5) {
          this.setState({
            message: "It's fucking freezing.",
            subMessage: "Fuck you, cold-face."
          })
        }

      }

      switch (this.state.icon) {
        case '03d' :
        case '03n' :
        this.setState({
          message: 'Fucking unremarkable out there.',
          subMessage: "Have you been giving the weather life advice? Please stop."
        })
        if (this.state.temp < 5) {
          this.setState({
            message: "It's fucking freezing.",
            subMessage: "Fuck you, cold-face."
          })
        }
      }
      

    switch (this.state.icon) {
      case '04d' :
      case '04n' :
        this.setState({
          message: 'Broken sky, broken dreams.',
          subMessage: "Just keep pretending everything's ok."
        })
    }

      if (this.state.icon === '04n') {
        this.setState({
          message: 'Broken sky, broken dreams.',
          subMessage: "Just keep pretending everything's ok."
        })
      }
      switch (this.state.icon) {
        case '09n' :
        case '09d' :
          this.setState({
            message: "It's fucking grim out there.",
            subMessage: "You'd fit right in."
          })
      }

      switch (this.state.icon) {
      case '10d' :
      case '10n' :
        this.setState({
          message: "It's only shitting raining.",
            subMessage: "Go outside, you need a shower."
        })
      }
      switch (this.state.icon) {
        case '11d' :
        case '11n' :
        this.setState({
          message: 'BAM! KAPOW!',
          subMessage: "Raaaaarrrrrgggghhh! I'm running on thunder, motherfucker!"
        })
      }
      if (this.state.icon === '13d') {
        this.setState({
          message: 'Snow Day!',
          subMessage: "At least today you have an excuse for staying in and doing nothing, loser."
        })
      }
      if (this.state.icon === '13n') {
        this.setState({
          message: 'Snow Night!',
          subMessage: "Remember people can see your footprints in the snow, pervert."
        })
      }
      switch (this.state.icon) {
        case '50d' :
        case '50n' :
        this.setState({
          message: 'Gorilla in the mist',
          subMessage: "You **are** disgustingly hairy."
        })
      }
      if (this.state.wind > 25) {
        this.setState({
          message: "Too fucking windy.",
          subMessage: "People say that about you a lot, by the way."
        })
        switch (this.state.icon) {
          case '09d' :
          case '09n' :
          case '10d' :
          case '10n' :
          this.setState({
            message: "Absolute fucking pisswind.",
            subMessage: "Don't even think about that fucking picnic."
          })
        }
      }
      if (this.state.wind > 31) {
        this.setState({
          message: "It's going to be difficult to walk out there",
          subMessage: "Think about staying in with a cup of tea and a good book. If you can read, that is. Can you read?"
        })
        switch (this.state.icon) {
          case '09d' :
          case '09n' :
          case '10d' :
          case '10n' :
          this.setState({
            message: "Absolute fucking pisswind. It's going to be difficult to walk out there.",
            subMessage: "Don't even think about that fucking picnic."
          })
        }
      }
      if (this.state.wind > 39) {
        this.setState({
          message: "Just stay inside",
          subMessage: "This is dangerously windy. Just like you."
        })
        switch (this.state.icon) {
          case '09d' :
          case '09n' :
          case '10d' :
          case '10n' :
          this.setState({
            message: "Stay inside, you fucking idiot.",
            subMessage: "Don't even think about that fucking picnic. It's dangerously windy, and it's wet."
          })
        }
        if (this.state.wind > 47) {
          this.setState({
            message: "Chance of falling masonry, motherfucker.",
            subMessage: "Expect to lose a few rooftiles, it's literally that windy. Don't go out there."
          })
          switch (this.state.icon) {
            case '09d' :
            case '09n' :
            case '10d' :
            case '10n' :
            this.setState({
              message: "Stay inside, you fucking idiot.",
              subMessage: "It's dangerously windy, and it's wet. Roofs are going to lose tiles today."
            })
          }
        }
        if (this.state.wind > 55) {
          this.setState({
            message: "DON'T. GO. OUTSIDE.",
            subMessage: "The wind is literally tearing trees out of the ground. You don't want to be involved in that shit."
          })
        }
        if (this.state.wind > 73) {
          this.setState({
            message: "Get to safety.",
            subMessage: "This is a hurricane. Stay inside and away from windows, skylights and glass doors. Find a safe area in the home (an interior room, a closet or bathroom on the lower level). If flooding threatens a home, turn off electricity at the main breaker. If a home loses power, turn off major appliances such as the air conditioner and water heater to reduce damage. Do not use electrical appliances, including your computer. Do not go outside. If the eye of the storm passes over your area, there will be a short period of calm, but at the other side of the eye, the wind speed rapidly increases to hurricane force and will come from the opposite direction. Also, do not go outside to 'see what the wind feels like.' It is too easy to be hit by flying debris. Beware of lightning. Stay away from electrical equipment. Don't use the phone or take a bath/shower during the storm."
          })
        }
      }
    }
    else {
      this.setState({
        error: "Please input search values..."
      })
    }
  }

  //this is the function that makes the API call and triggers onResponse()
  export async function getWeather(e) {
    ReactGA.event({
      category: 'User',
      action: 'Searched Weather'
    });
    //if we have the user's coordinates and they haven't attempted a search for somewhere else, we use their coordinates to search
    if (this.state.value.length < 1 && this.props.latitude) {
      location = 'lat=' + this.props.latitude + "&lon=" + this.props.longitude;
    }
    //if not, we use what they put in the search bar
    else {
      location = 'q='+ this.state.city +','+ this.state.country;
    }
    const api_call = await fetch(`//api.openweathermap.org/data/2.5/weather?${location}&units=metric&appid=${Api_Key}`);
    const response = await api_call.json();
    //we then store the response in state
    this.setState({
      response: response,
    })
    if (response.cod === "404") { //make sure the placename works
      alert("Oh shit! You've found a bug in the system. I'm making a proper error reporting feature for stuff like this - but in the meantime could you email wilf@wilfhorsfall.com to let me know which placename you searched for?")
    }
    if (response.cod === "429") { //make sure the placename works
      alert("Do you think I'm fucking made of API keys? Unfortunately we've hit the limit of 60 calls to the weather API per minute - try again in 30-60 seconds.")
    }
    else {
      //then we fire the onResponse function
      this.onResponse();
      // and for the benefit of getForecast, update the city and country variables with the values stored in state
      //city = this.state.city
      //country = this.state.country
      //we then fire getForecast, which predicts the future for us
      this.getForecast();
    }
  }


  export async function getForecast(e) {
    //getForecast uses city and country rather than location
    const api_call = await fetch(`//api.openweathermap.org/data/2.5/forecast?q=${this.state.city},${this.state.country}&units=metric&appid=${Api_Key}`); 
    let response = await api_call.json();
    let rowWidth = document.getElementById('weatherRow').scrollWidth;
    document.getElementById('weatherRow').scrollLeft = -rowWidth;
    //and we store the information
    if(this.state.city && this.state.country){
      this.setState({
        currentForecast: response
      })
    }
  }
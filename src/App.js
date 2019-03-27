import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import Now from './Components/now';
import WeatherRow from './Components/weatherrow';
import ShitTag from './Components/shittag';
import WTF from './Components/wtf';
import Prompt from './Components/prompt';
import Social from './Components/social';
import IosPrompt from './Components/ios';
import ReactGA from 'react-ga';
import {onSuggestionsClearRequested, onSuggestionsFetchRequested, onChange, isCity, getSuggestions, getSuggestionValue, renderSuggestion, renderSectionTitle, getSectionSuggestions, getCountry } from './searchFunc.js';
import {onResponse, getWeather, getForecast} from './weatherFunc.js';
import {Analytics_ID} from './key.js';
export let location = '';
export let deferredPrompt;


ReactGA.initialize(Analytics_ID);

class App extends React.Component {

  state = {
    temperature: 'Loading', //the temperature doubles as a loading notification if the connection is slow
    city: 'London',
    country: 'GB',
    humidity: '',
    description: '',
    error: '',
    value: '',
    suggestions: [],
    message: '',
    subMessage: '',
    appDownload: false,
    icon: '02d'
  }

  constructor(props) {
    super(props);
    this.onResponse = onResponse.bind(this);
    this.getWeather = getWeather.bind(this);
    this.getForecast = getForecast.bind(this);
    this.onChange = onChange.bind(this);
    this.onSuggestionsFetchRequested = onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = onSuggestionsClearRequested.bind(this);

  }
  
  //as soon as the component mounts on page load, we trigger the API calls
  componentDidMount() {
    this.getWeather()
    //We also listen to see if the user can download shitstorm as a webapp
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI notify the user they can add to home screen
        console.log('app download')
        this.setState( {
            appDownload: true
        })
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      label: 'Search Town',
      placeholder: this.state.city ? this.state.city : "Where the fuck do you live?", //we display the city if geolocation found our user, if not we demand to know where they live
      value,
      onChange: this.onChange
    };
    return (
      <div className={'weather'+ this.state.icon}>
         <div className={this.state.appDownload ? 'downloadable wrapper' : 'wrapper'}>
            <ShitTag />
            <WTF />
            <Social />
            <Autosuggest 
              multiSection={true}
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              renderSectionTitle={renderSectionTitle}
              getSectionSuggestions={getSectionSuggestions}
              inputProps={inputProps} 
            />
            <Now 
              temperature={this.state.temperature} 
              description={this.state.description} 
              windDeg={this.state.windDeg}
              windSpeed={this.state.windSpeed}
              daylightLeft={this.state.daylightLeft}
              sunrise={this.state.sunrise}
              sunset={this.state.sunset}
              message={this.state.message}
              subMessage={this.state.subMessage}
              icon={this.state.icon}
            />
            <WeatherRow currentForecast={this.state.currentForecast}/>
            <Prompt />
            <IosPrompt />
        </div>
      </div>
    )
  }
}
export default App;
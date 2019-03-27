import React, { Component } from 'react';
import {cities} from './variables.js';

//this is all stuff for Autosuggest
  export function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  export function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('^' + escapedValue, 'i');
  
    //autosuggest checks our list of pre-approved cities that can trigger an API call
    return cities
      .map(section => {
        return {
          title: section.title,
          cities: section.cities.filter(language => regex.test(language.name)) //we convert both the user-inputted search term and the cities themselves to lowercase so as to make searches case insensitive
        };
      })
      .filter(section => section.cities.length > 0);
  }
  
  
  export function getSuggestionValue(suggestion) {
    return suggestion.name;
  }
  
  export function renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name}</span>
    );
  }
  
  export function renderSectionTitle(section) {
    return (
      <strong>{section.title}</strong>
    );
  }
  
  export function getSectionSuggestions(section) {
    return section.cities;
  }
  
  //here we check the country the city belongs to. Right now there is only one possible country, but in future more may be added
  export function getCountry(cities, prop, value) {
    var result = cities.find(function (language) {
      return language.cities.some(function (item) {
        return item[prop].toLowerCase() === value.toLowerCase()
      })
    })
  
    return result ? result.title : null
  }

  // this is to see if the search value matches an approved city
  export function isCity(cities, prop, value) {
    return cities.some(function (language) {
      return language.cities.some(function (item) {
        return item[prop].toLowerCase() === value.toLowerCase()
      })
    })
  }

  
  export function onChange(event, { newValue, method }){
    this.setState({
      value: newValue
    });
    
    if (isCity(cities, 'name', newValue)) {
      this.setState({
        city: newValue,
        country: getCountry(cities, 'name', newValue)
      },
      () => this.getWeather()
      );
    }

  };
  
  //autosuggest needs this
  export function onSuggestionsFetchRequested ({ value }){
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  export function onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  };
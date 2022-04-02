import { getel, request, nextDays, withsearch, query, renderdivs, key } from './fun.js';

renderdivs(5);

// get current location
navigator.geolocation.getCurrentPosition((p) => {
  request(`https://api.weatherbit.io/v2.0/current?lat=${p.coords.latitude}&lon=${p.coords.longitude}&key=${key}`);
  nextDays(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${p.coords.latitude}&lon=${p.coords.longitude}&key=${key}`);

}, () => query('.err').style.display = 'block');

// get country 
withsearch();
query('.err button').onclick = () => {
  query('.err').style.display = 'none';
  query('#city').focus();
}

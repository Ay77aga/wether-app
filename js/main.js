import { getel, request } from './fun.js';

const key = '4304b75fe0dc4797b3e29d1bed460757';
let search = document.querySelector('#city');
navigator.geolocation.getCurrentPosition(function(p) {
  let lo = p.coords.longitude,
    la = p.coords.latitude;
  let URL = `https://api.weatherbit.io/v2.0/current?lat=${la}&lon=${lo}&key=${key}`;
  request(URL);
  //  in error
}, function() {
  console.log('err');
  document.querySelector('.err').style.display = 'block';
});
document.querySelector('.err button').onclick = () => {
  document.querySelector('.err').style.display = 'none';

}



function withsearch() {
  search.focus();
  document.querySelector('[type=submit]').addEventListener('click', () => {
    if (search.value != '') {
      URL = `https://api.weatherbit.io/v2.0/current?&city=${search.value}&key=${key}`;
      request(URL);
    }
  });
}
withsearch();
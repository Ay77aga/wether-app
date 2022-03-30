const key = 'd4ad7f7abab84654994222452222903';
const apiUrl = 'https://api.weatherapi.com/v1/current.json?key=';
let word_serch = document.querySelector('#search');


document.querySelector('[type=submit]').onclick = () => {
  // get Json file
  let URL = `${apiUrl}${key}&q=${word_serch.value}&api=yes`;
  let request = new XMLHttpRequest();
  request.open('GET', URL);
  request.addEventListener('load', () => {
    // parse data
    const data = JSON.parse(request.responseText);
    // check data
    if (request.status <= 200) {
      console.log(data);
      getel('.location', data.location.name);
      getel('.temp_c', data.current.temp_c, ' temp');
      getel('.country', data.location.country);
      getel('.tz', data.location.tz_id);
      getel('.time', data.location.localtime)
    } else
      alert('invaled data');
  });

  request.send();
}


function getel(el, val, ex = '') {
  return document.querySelector(el).textContent = val + ex;
}
import { getel, request } from './fun.js';

for (let x = 0; x < 16; x++) {
  let div = document.createElement('div');
  let sp1 = document.createElement('span');
  let sp2 = document.createElement('span');
  let im = document.createElement('img');
  div.appendChild(sp1);
  div.appendChild(sp2);
  div.appendChild(im);
  document.querySelector('.future').appendChild(div);
}

const key = 'cad89863634f497aa11b3febc80cfbb2';
// '4304b75fe0dc4797b3e29d1bed460757';
let search = document.querySelector('#city');
navigator.geolocation.getCurrentPosition(function(p) {
  let lo = p.coords.longitude,
    la = p.coords.latitude;
  let URL = `https://api.weatherbit.io/v2.0/current?lat=${la}&lon=${lo}&key=${key}`;
  let link = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${la}&lon=${lo}&key=${key}`;
  future(link);
  request(URL);
  //  in error
}, function() {
  console.log('err');
  document.querySelector('.err').style.display = 'block';
});
document.querySelector('.err button').onclick = () => {
  document.querySelector('.err').style.display = 'none';

}
withsearch();

function future(url) {
  let divs = document.querySelectorAll('.future div');
  let req = new XMLHttpRequest();
  req.open('GET', url);
  req.onload = () => {
    const data = JSON.parse(req.responseText).data;
    console.log(data)
    for (let i in data) {
      divs[i].children[0].textContent = data[i].valid_date;
      divs[i].children[1].textContent = data[i].temp + ' °';
      divs[i].children[2].src = `https://www.weatherbit.io/static/img/icons/${data[i].weather.icon}.png`;
    }
  }
  req.send();
}




function withsearch() {
  search.focus();
  document.querySelector('[type=submit]').addEventListener('click', () => {
    if (search.value != '') {
      let URL = `https://api.weatherbit.io/v2.0/current?&city=${search.value}&key=${key}`;
      let link = `https://api.weatherbit.io/v2.0/forecast/daily?city=${search.value}&key=${key}`;;
      future(link);
      request(URL);
    } else {
      document.querySelector('.err').style.display = 'none';
    }
  });
}

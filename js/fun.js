let key = 'cad89863634f497aa11b3febc80cfbb2';

function getel(el, val, ex = '') {
  return document.querySelector(el).textContent = val + ex;
}

function query(el) {
  return document.querySelector(el);
}

// make request API
function request(url) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  query('.load').style.display = 'block';
  request.addEventListener('load', function() {
    if (request.status == 0) {
      key = '4304b75fe0dc4797b3e29d1bed460757';

    }
    else if (request.status == 200) {
      const data = JSON.parse(request.responseText).data[0];
      render(data);
      // console.log(data)
    }
    else
      query('.err').style.display = 'block';
  });
  request.onloadend = () => query('.load').style.display = 'none';
  request.send();
}

// render data in page
function render(data) {
  // wether icon
  query('.icon').style.display = 'block';
  query('.icon').src = `https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`;

  getel('.temp', data.temp, '°');
  getel('.city', data.city_name);
  getel('.country', data.country_code);
  getel('.windspd', data.wind_spd, ' m/s');
  getel('.weather', data.weather.description);
  getel('.winddir', data.wind_dir, ' °');
  getel('.pres', data.pres, ' mb');
  getel('.cloud', data.clouds, '%');
  getel('.dewpt', data.dewpt, ' Celcius');
  getel('.rh', data.rh, '%');
  getel('.vis', data.vis, ' KM');
  getel('.slp', data.slp, ' mb');
  getel('.solar_rad', data.solar_rad);
  getel('.aqi', data.aqi);
  getel('.uv', data.uv);

  if (data.pod == 'n') getel('.pod', 'Night');
  else getel('.pod', 'Day');
}

function nextDays(url) {
  let divs = document.querySelectorAll('.nextDays div');
  let request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = () => {
    const data = JSON.parse(request.responseText).data;
    console.log(data)
    let divs = document.querySelectorAll('.nextdays div')
    for (let i in data) {
      if (i == 5) break;
      divs[i].children[0].textContent = data[i].valid_date;
      divs[i].children[1].textContent = data[i].temp + ' °';
      divs[i].children[2].src = `https://www.weatherbit.io/static/img/icons/${data[i].weather.icon}.png`;
    }
  }
  request.send();
}

function withsearch() {
  let search = query('#city');
  search.focus();
  query('[type=submit]').addEventListener('click', () => {
    if (search.value != '') {
      nextDays(`https://api.weatherbit.io/v2.0/forecast/daily?city=${search.value}&key=${key}`);
      request(`https://api.weatherbit.io/v2.0/current?&city=${search.value}&key=${key}`);
    }
    else query('.err').style.display = 'none';
  });
}

function renderdivs(num) {
  for (let x = 0; x < num; x++) {
    let div = document.createElement('div');
    let sp1 = document.createElement('span');
    let sp2 = document.createElement('span');
    let im = document.createElement('img');
    div.appendChild(sp1);
    div.appendChild(sp2);
    div.appendChild(im);
    query('.nextdays').appendChild(div);
  }
}
export {
  getel,
  query,
  request,
  nextDays,
  withsearch,
  renderdivs,
  key
}

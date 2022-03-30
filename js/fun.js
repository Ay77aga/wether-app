function getel(el, val, ex = '') {
  return document.querySelector(el).textContent = val + ex;
}

// make request API
function request(url) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  document.querySelector('.load').style.display = 'block';
  request.addEventListener('load', function() {
    if (request.status <= 200) {
      const data = JSON.parse(request.responseText).data[0];
      render(data);
      console.log(data)
    } else {
      document.querySelector('.err').style.display = 'block';
    }
  });
  request.onloadend = () => {
    document.querySelector('.load').style.display = 'none';
  }
  request.send();

}

function render(data) {
  let img = document.querySelector('.icon');
  // render data in page
  getel('.temp', data.temp);
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
  if (data.pod == 'n') {
    getel('.pod', 'Night');
  } else {
    getel('.pod', 'Day');
  }
  img.src = `https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`

}
export {
  getel,
  request
}
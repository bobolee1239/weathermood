import axios from 'axios';

const key = '2dd1ca03edb887bf712fc31da873415f';

/**
 * get Weather group from code
 * @param {int} code The first number.
 * @return {string} The sum of the two numbers.
 */
export function getWeatherGroup(code) {
  let group = 'na';

  if (200 <= code && code < 300) {
    group = 'thunderstorm';
  } else if (300 <= code && code < 400) {
    group = 'drizzle';
  } else if (500 <= code && code < 600) {
    group = 'rain';
  } else if (600 <= code && code < 700) {
    group = 'snow';
  } else if (700 <= code && code < 800) {
    group = 'atmosphere';
  } else if (800 === code) {
    group = 'clear';
  } else if (801 <= code && code < 900) {
    group = 'clouds';
  }

  return group;
}

export function capitalize(string) {
  return string.replace(/\b\w/g, l => l.toUpperCase());
}

const weatherBaseUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${key}`;
const weatherSource  = axios.CancelToken.source();

/**
 * get Weather group from code
 * @param {string} city The first number.
 * @param {string} unit The first number.
 * @return {Promise} The sum of the two numbers.
 */
export function getWeather(city, unit) {
  let url = `${weatherBaseUrl}&q=${encodeURIComponent(city)}&units=${unit}`;

  console.log('Making request to', url);

  return axios.get(url, {cancelToken: weatherSource.token}).then((res) => {
    if (res.data.cod && res.data.message) {
      throw new Error(res.data.message);
    }

    return {
      city: capitalize(city),
      code: res.data.weather[0].id,
      group: getWeatherGroup(res.data.weather[0].id),
      description: res.data.weather[0].description,
      temp: res.data.main.temp,
      unit: unit,
    };
  }).catch((err) => {
    if (axios.isCancel(err)) {
      console.error(err.message, err);
    } else {
      throw err;
    }
  });
}

/**
 *
 */
export function cancelWeather() {
  weatherSource.cancel('Weather request canceled');
}

//  TODO... Forecast

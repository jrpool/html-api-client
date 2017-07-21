/**
  HTTP Client making a GET request to IMDB for a list of motion pictures
  matching a specified query and outputting the list.
*/

// Import the `hget` module.
const hgetMod = require('./hget');

// Identify its objects.
const {chunks, hget, arg0IfValid} = hgetMod;

// Initialize the query parameters.
const requestParams = {
  url: 'http://www.imdb.com/find',
  q: '',
  ref_: 'nv_sr_fn',
  s: 'all'
};

/**
  Define a function to extract the list of titles, years, and types from the
  HTML response of IMDB.
*/
const getList = () => {
  // Combine and JSON-parse the chunks and identify the resulting object.
  const responseObject = JSON.parse(chunks.join(''));
  // Initialize a report object.
  const reportObject = {};
  // Add the temperature to it in Kelvin, Celsius, and Fahrenheit scales.
  reportObject['Kelvin'] = responseObject['main']['temp'];
  const kelvinNum = Number.parseFloat(reportObject['Kelvin']);
  reportObject['Celsius'] = (kelvinNum - 273.15).toFixed(2);
  reportObject['Fahrenheit'] = (9 * kelvinNum / 5 - 459.67).toFixed(2);
  // Return the report object.
  return reportObject;
};

// Define a function to output a report of the requested temperature.
const tempReport = () => {
  const temps = getTemp();
  for (const scale of ['Kelvin', 'Celsius', 'Fahrenheit']) {
    console.log('Temperature in ' + scale + ': ' + temps[scale]);
  }
};

/*
  Perform a GET request to the URL specified on the command line, if valid,
  and process its response.
*/
const city = arg0IfValid();
if (city) {
  requestParams['q'] = city;
  const urlWithQuery
    = requestParams['url']
    + '?'
    + ['q', 'mode', 'appid'].map(v => v + '=' + requestParams[v]).join('&');
  hget(urlWithQuery, tempReport);
}

/**
  HTTP Client making a GET request to IMDB for a list of motion pictures
  matching a specified query and outputting the list.
*/

// Import required modules.
const hgetMod = require('./hget');
const cheerio = require('cheerio');

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
  // Combine the chunks into a document and identify it as a cheerio object.
  const $ = cheerio.load(chunks.join(''));
  // Identify its “Titles” section’s table.
  const titleTable = $('a[name=tt]').parent().parent().children('table');
  // Identify its rows.
  const titleRows = titleTable.children('tr');
  // Initialize the result.
  const result = [];
  // For each row:
  titleRows.each(
    // Add its text content to the result.
    (index, element) => {
      result.push(element.children('td.result_text').first().text());
    }
  );
  // Return the result as a set of lines of text.
  return result.join('\n') + '\n';
};

/// Define a function to output a report of the matching motion pictures.
const listReport = () => {console.log(getList());};

/**
  Perform a GET request to the URL specified on the command line, if valid,
  and process its response.
*/
const query = arg0IfValid();
if (query) {
  requestParams['q'] = query;
  const urlWithQuery
    = requestParams['url']
    + '?'
    + ['q', 'ref_', 's'].map(v => v + '=' + requestParams[v]).join('&');
  hget(urlWithQuery, listReport);
}

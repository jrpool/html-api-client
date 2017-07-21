# html-api-client

Node HTTP client application designed for a specific API that responds with HTML

## Project Members

[Jonathan Pool](https://github.com/jrpool)

## modules

```
hget.js
movie-search.js
copy-edit-files.js
```

## Discussion

This application demonstrates the use of Node’s `http` module and the `cheerio` parsing library in a request to an API that responds with an HTML document.

The application fulfills the specifications of the “Movie Search CLI” module of the [Learners Guild][lg] curriculum in Phase 2 of the Guild’s curriculum.

## Installation and Setup

0. These instructions presuppose that [npm][npm] is installed.

1. Your copy of this project will be located in its own directory, inside some other directory that you may choose or create. For example, to create that parent directory inside your own home directory’s `Documents` subdirectory and call it `projects`, you can execute:

    `mkdir ~/Documents/projects`

Make that parent directory your working directory, by executing, for example:

    `cd ~/Documents/projects`

2. Clone this project’s repository into it, thereby creating the project directory, named `html-api-client`, by executing:

    `git clone https://github.com/jrpool/html-api-client.git html-api-client`

2. Make the project directory your working directory by executing:

    `cd html-api-client`

3. Install required dependencies (you can see them listed in `package.json`) by executing:

    `npm i`

## Usage and Examples

Enter `node movie-search «query»`, replacing `«query»` with any string, to get an output of the titles, release years, and types of motion pictures reported by IMDB as matching that string. For example:

`node movie-search 'Panchali'`

To perform linting, execute `npm run lint`.

To perform the supplied tests, execute `npm test`.

[lg]: https://www.learnersguild.org
[npm]: https://www.npmjs.com/

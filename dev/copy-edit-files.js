/// Cautiously copy and edit files in a directory tree.

const fs = require('fs');

const cpr = require('cpr');

let pathList;

/**
  =========
  FUNCTIONS
  =========
*/

/// Define a function to validate calling arguments.
const areValid = args => {
  return (
    args.length > 2 && args.length < 5
    && args.every(arg => arg !== undefined && typeof arg === 'string')
    && args.slice(0, 2).every(arg => arg.length)
    && args[0][0] === '/' && args[1][0] === '/'
    && !args[1].startsWith(args[0])
    && !args[0].startsWith(args[1])
    && (args.length === 3 || /^\/.+\/$/.test(args[2]))
  );
};

/**
  Define a function to obtain editing parameters from arguments.
  Preconditions:
    0. The count of arguments is 1 or 2.
    1. If there are 2 arguments, argument 0 is a nonblank regular expression
      and argument 1 is a string.
    2. If there is 1 argument, it is the name of a known editing rule.
*/
const getEditParams = args => {
  if (args.length === 2) {
    try {
      const arg0RegExp = RegExp(args[0], 'mg');
      return [arg0RegExp, args[1]];
    }
    catch (err) {
      console.log('[getEditParams]' + err.message);
    }
  }
  else if (args.length === 1) {
    const rule = args[0];
    if (rule === 'uncomment') {
      return [RegExp('^ *\\/\\/ .+\n|^ *\\/\\*\n[^]+?\\*\\/\n', 'mg'), ''];
    }
    else {
      console.log('[getEditParams]' + args[0] + '?');
    }
  }
};

/**
  Define a function to cautiously copy the non-hidden items in a directory
  tree and populate the list of destination pathnames.
*/
const treeCopy = (fromDir, toDir, nextFunction) => {
  cpr(
    fromDir,
    toDir,
    {
      confirm: true,
      filter: /\/\./
    },
    (err, destinationPaths) => {
      if (err) {
        console.log('[treeCopy]' + err.message);
      }
      else {
        pathList = destinationPaths;
        nextFunction();
      }
    }
  );
};

/**
  Define a function to edit the files in a specified array of pathnames
  in accord with a specified rule.
*/
const editFiles = (pathnames, editParams) => {
  const callback = (pathname) => (err, data) => {
    if (err) {
      console.log(
        '[editFiles/readFile] (' + pathname + '): ' + err.message
      );
    }

  for (const pathname of pathnames) {
    fs.stat(
      pathname,
      (err, stats) => {
        if (stats.isFile()) {
          fs.readFile(
            pathname,
            'utf8',
             callback(pathname)
              else {
                const editedContent = data.replace(...editParams);
                fs.writeFile(
                  pathname,
                  editedContent,
                  'utf8',
                  err => {
                    if (err) {
                      console.log(
                        '[editFiles/writeFile] (' + pathname + '): '
                        + err.message
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
};

/**
  =========
  EXECUTION
  =========
*/
const callArgs = process.argv.slice(2);
if (areValid (callArgs)) {
  const editParams = getEditParams(callArgs.slice(2));
  if (editParams) {
    treeCopy(
      callArgs[0],
      callArgs[1],
      () => {editFiles(pathList, editParams);}
    );
  }
}

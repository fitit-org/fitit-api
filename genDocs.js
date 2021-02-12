const converter = require('widdershins');
const fs = require('fs');

const apiDef = JSON.parse(
  fs.readFileSync('./src/assets/fitit-openapi.json').toString()
);

const options = {
  theme: 'darkula',
  clipboard: true,
  expandBody: true,
  resolve: false,
  shallowSchemas: false,
  verbose: false,
  help: false,
  version: false,
  httpsnippet: false,
  discovery: false,
  lang: false,
  language_tabs: [
    { http: 'HTTP' },
    { javascript: 'JavaScript' },
    { 'javascript--nodejs': 'Node.JS' },
  ],
};

converter.convert(apiDef, options).then((str) => {
  fs.writeFileSync('./APIDOC.md', str, 'utf8');
});

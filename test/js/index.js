var recquire_t = require('recquire');

var recquire = recquire_t('gn-test', 'index.js', 'intro.js', 'outro.js', false, false);

recquire(__dirname + '/src/', module.exports, -1);
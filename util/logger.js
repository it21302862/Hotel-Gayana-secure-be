const bunyan = require('bunyan');

const log = bunyan.createLogger({
    name: 'Team-ark-backend',
});

module.exports = { log };

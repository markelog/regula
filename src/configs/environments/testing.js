const config = require('./development');

// Disable logs - don't need that info in tests
config.database.options.logging = false;
config.logs.enabled = false;

module.exports = config;

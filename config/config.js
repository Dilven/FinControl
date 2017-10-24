var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'FinControl'
    },
    port: process.env.PORT || 3000,
    db: process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/fincontrol'
  },

  test: {
    root: rootPath,
    app: {
      name: 'FinControl'
    },
    port: process.env.PORT || 3000,
    db: process.env.DATABASE_URL_TEST || 'mysql://root@localhost:3306/fincontrol'
  },

  production: {
    root: rootPath,
    app: {
      name: 'FinControl'
    },
    port: process.env.PORT || 3000,
    db: process.env.DATABASE_URL || 'mysql://root@localhost:3306/fincontrol'
  }
};

module.exports = config[env];

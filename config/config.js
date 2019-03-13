var exports = module.exports = {
    isTest: true,
    server: {
      port: process.env._PORT,
      host: process.env.HOST
    },
    bodyParser: {
      extended: true
    },
    consign: {
      verbose: false
    }
  };
const razzleHeroku = require("razzle-heroku");

module.exports = {
  modify: (config, {target, dev}, webpack) => {
    config = razzleHeroku(config, {target, dev}, webpack);
    config.node = {
      fs: "empty",
      net: "empty",
      tls: "empty"
    };
    return config;
  }
};

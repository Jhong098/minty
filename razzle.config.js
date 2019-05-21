module.exports = {
  modify: config => {
    config.node = {
      fs: "empty",
      net: "empty",
      tls: "empty"
    };
    return config;
  }
};

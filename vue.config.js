module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/Rp/" : "/",
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.compiler = require("vue-template-babel-compiler");
        return options;
      });
  },
};

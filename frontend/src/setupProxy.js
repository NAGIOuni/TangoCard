const { legacyCreateProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/**",
    legacyCreateProxyMiddleware({
      target: import.meta.env.VITE_BACKEND_URL,
      changeOrigin: true,
    })
  );
};

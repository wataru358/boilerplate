/**
 * References:
 * https://github.com/zeit/next.js/tree/c1037949fd3e26c49c453ba089fc56973545ddb4#custom-server-and-routing
 * https://github.com/zeit/next.js/blob/09a8960f1ae1cdb770b3d601fd1adac43f35aba7/examples/custom-server-express/server.js
 * https://github.com/zeit/next.js/blob/09a8960f1ae1cdb770b3d601fd1adac43f35aba7/examples/with-custom-reverse-proxy/server.js
 * https://github.com/TrueCar/gluestick/blob/eef634bb700700d7d54134179f02577641667027/packages/gluestick/src/renderer/helpers/setProxies.js
 */
// https://github.com/motdotla/dotenv
require("dotenv").config()

const express = require("express")
//const voyager = require("graphql-voyager/middleware")
//const proxyMiddleware = require("http-proxy-middleware")
const next = require("next")

const port = parseInt(process.env.SERVER_PORT, 10) || 8888
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

const captureError = (req, res) => () => {
  if (res.statusCode >= 400) {
    const message =
      `HTTP ${res.statusCode} for ${req.method} ${req.url} ` +
      `from ${req.headers.referer}`
    console.info(message)
  }
}

app.prepare().then(() => {
  const server = express()
  server.use((req, res, next) => {
    res.on("close", captureError(req, res))
    res.on("finish", captureError(req, res))
    next()
  })
  /*proxies.forEach(({ context, ...options }) => {
    server.use(proxyMiddleware(context, options))
  })*/
  //server.use("/voyager", voyager.express({ endpointUrl: "/graphql" }))
  server.get("*", (req, res) => {
    if (req.path.endsWith("/") && req.path !== "/") {
      const pathWithoutTrailingSlash = req.path.slice(0, -1)
      const [, queryString] = req.originalUrl.split("?")
      const newUrl = queryString
        ? `${pathWithoutTrailingSlash}?${queryString}`
        : pathWithoutTrailingSlash
      return res.redirect(newUrl)
    }
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`)
  })
})

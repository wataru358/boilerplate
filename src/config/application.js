const publicBuildtimeConfig = {
  isProduction: process.env.NODE_ENV === "production",
}

const publicRuntimeConfig = {
  isProduction: process.env.NODE_ENV === "production",
}

// use CommonJS so that this can be used in next.config.js and server.js which
// do not support ES modules
module.exports = {
  publicBuildtimeConfig,
  publicRuntimeConfig,
}

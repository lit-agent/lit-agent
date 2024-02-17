import http from "http"

const originalRequest = http.request

http.request = function (options, callback) {
  console.log({
    url:
      options.href || `${options.protocol}//${options.hostname}${options.path}`,
    method: options.method,
    headers: options.headers,
    body: options.body, // Note: This might not be directly available like this
  })

  return originalRequest(options, callback)
}

export default http

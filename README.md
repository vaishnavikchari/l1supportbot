# How to communicate a React app to a Node API in the same repository

* Frontend bootstrapped with Create React App
* Both applications live reload
* API is not accessible from public url, only from localhost
  * I would like to improve this and serve GraphiQL, but it's ok for the moment
* NOT PRODUCTION READY
  * It serves a development version of React app
  * To make it production ready, build the API and serve the build folder from the Node server with `server.use(express.static("build"))`
# How to communicate a React app to a Node API in the same repository

* Frontend bootstrapped with Create React App in /
* Node API in /graphql
* GraphiQL in /graphiql

## Caveats

It takes too long to live reload. This is because we build the frontend every time there is a change.

Another version of this project served react app using `react-scripts start` instead. This resulted in faster update times, but it had its own issues. API and GraphiQL were not accesible in a public URL, only in localhost.
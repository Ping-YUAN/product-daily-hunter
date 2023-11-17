# ProductDailyHunter

**This is a mono repo created by [Nx](https://nx.dev)**

The project is used to track the new released product to give use an overview report based on the day that user select.
Project build with angular 17 with new control flow/signal/rxjs and nodejs.

## Main Feature

1. retrieve the products that publish on the given day.
2. a dashboard with statistic cards according to the product.
3. check products by category.
4. a chart with the top 10 popular categories trend.

## Start the app

Rename `.env.template` to `.env`.

To start the development server run `npm start` and `npm run dev` or `npm run build`(to have product mode angular app). Open your browser and navigate to http://localhost:300/.

## Useful Command

`npm run format` : format code  
`npm run coverage` : check the code coverage report
`npm run dev` : start a watch for angular  
`npm start` : start nodejs server  
`npm run build` : build product mode angular  
`npm run build:server` : build server from typescript to js  
`npm run e2e:server` : run server e2e teset  
`npm run e2e:angular` : run angular e2e test

## env

PORT: port to deploy the app.  
CLIENT_ID: client id from the product hunter site.  
CLIENT_SECRET: clent secret from the product hunter site.
baseUrl: base url for graphiql.

## What to do next

1. Graphiql
   As I am not that experienced with graphiql, currently the backend doesn't retrieve data from the product graphiqul api instead, using the product backend api to retrieve data.
   Next should consider correct the api `apps/hunter-server/src/libs/product-hunter-api.ts` logic so that we can implement our own graphiql query with the clientid and clientsecret etc..

2. ssr render.
   As angular support sever side render, it would be great to full enable the function.

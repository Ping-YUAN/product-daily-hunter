# ProductDailyHunter

**This is a mono repo created by [Nx](https://nx.dev)**

The project is used to track the new released product to give use an overview report based on the day that user select.
Project build with  
`angular v17` with new control flow/signal/rxjs.  
`node v18.18.2` with express.  
[`Product Hunter Api` ](https://api.producthunt.com/v2/docs)

## Main Feature

1. retrieve the products that publish on the given day.
2. a dashboard with statistic cards according to the products data received.
3. check products by category.
4. a chart with the top 10 popular categories trend.

## Start the app

Run `npm install`
Rename `.env.template` to `.env`.  
Provide `CLIENT_ID` and `CLIENT_SECRET`. You can get by registry your account on [productHunter](www.producthunter.com) then goto `API Dashboard` to generate your own id and secret.

To start the development server run `npm start` and `npm run dev` or `npm run build`(product mode angular).

Open your browser and navigate to http://localhost:3000/.

## Useful Command

`npm run format` : format code  
`npm run coverage` : check the code coverage report  
`npm run dev` : start a watch for angular  
`npm start` : start nodejs server  
`npm run build` : build product mode angular  
`npm run build:server` : build server from typescript to js  
`npm run e2e:server` : run server e2e teset  
`npm run e2e:angular` : run angular e2e test (run `npm start` and `npm run build` before run angular e2e test)

## .env

PORT: port to deploy the app.  
CLIENT_ID: client id from the product hunter site.  
CLIENT_SECRET: clent secret from the product hunter site.

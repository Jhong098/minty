import React from "react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { renderRoutes } from "react-router-config";
import Routes from "../common/routes/Routes";
import AppBar from "../common/components/AppBar";

export default (path, store, context) => {
  const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter context={context} location={path}>
        <AppBar />
        {renderRoutes(Routes)}
      </StaticRouter>
    </Provider>
  );

  return (
    `<!doctype html>
        <html lang="">
        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta charset="utf-8" />
            <title>Minty</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${
              assets.client.css
                ? `<link rel="stylesheet" href="${assets.client.css}">`
                : ''
            }
            ${
              process.env.NODE_ENV === 'production'
                ? `<script src="${assets.client.js}" defer></script>`
                : `<script src="${assets.client.js}" defer crossorigin></script>`
            }
            <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
            <link rel="shortcut icon" href="https://img.icons8.com/dusk/64/000000/us-dollar.png" type="image/png" />
        </head>
        <body>
            <div id="root">${markup}</div>
            <script>
          </script>
        </body>
        </html>`
    );
};

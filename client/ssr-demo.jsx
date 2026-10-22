import React from "react";

import {
  renderToString
} from "react-dom/server";

import ServerTicketSummary
  from "./src/ssr/ServerTicketSummary.jsx";

const requestedPath = "/api/tickets";

async function runSSRDemo() {

  try {

    console.log(
      "\n--- FETCHING TICKETS FROM EXPRESS ---\n"
    );


    const response =
      await fetch(
        "http://localhost:3000/api/tickets"
      );


    if (!response.ok) {

      throw new Error(
        "Unable to retrieve tickets."
      );

    }


    const tickets =
      await response.json();


    console.log(
      `Tickets received from API: ${tickets.length}`
    );

    let page;

    if (requestedPath === "/api/tickets") {

      page = (
         <ServerTicketSummary
          tickets={tickets}
        />
      );
    }
    else{
        page = (<h1>404 - Page Not Found</h1>);
    }


    const html =
      renderToString(

      /*   <ServerTicketSummary
          tickets={tickets}
        /> */
        page

      );


    console.log(
      "\n--- SERVER RENDERED HTML ---\n"
    );


    console.log(html);


    console.log(
      "\n--- END SERVER RENDERED HTML ---\n"
    );

  }
  catch (error) {

    console.error(
      "SSR Error:",
      error.message
    );

  }

}


runSSRDemo();
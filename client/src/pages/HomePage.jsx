import { Link } from "react-router-dom";


function HomePage() {

  return (

    <section>

      <h1>
        Student Support Tracker
      </h1>


      <p>
        Welcome to the FWAD102
        Student Support application.
      </p>


      <p>
        Use this application to view
        and manage student support tickets.
      </p>


      <Link to="/tickets">
        View Support Tickets
      </Link>

      {" | "}

      <Link to="/create-ticket">
        Create Ticket
      </Link>

    </section>

  );

}

export default HomePage;
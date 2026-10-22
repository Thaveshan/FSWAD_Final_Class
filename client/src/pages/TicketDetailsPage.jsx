import {
  Link,
  useParams
} from "react-router-dom";


function TicketDetailsPage({
  tickets,
  toggleTicketStatus
}) {

  const { id } = useParams();


  const ticket = tickets.find(
    (ticket) =>
      ticket._id === id
  );


  if (!ticket) {

    return (

      <section>

        <h1>Ticket Not Found</h1>

        <p>
          We could not find a ticket
          with ID {id}.
        </p>

        <Link to="/tickets">
          Back to Tickets
        </Link>

      </section>

    );

  }


  return (

    <section>

      <h1>Ticket Details</h1>


      <p>
        <strong>Ticket ID:</strong>{" "}
        {ticket._id}
      </p>


      <h2>
        {ticket.title}
      </h2>


      <p>
        <strong>Description:</strong>{" "}
        {ticket.description}
      </p>


      <p>
        <strong>Priority:</strong>{" "}
        {ticket.priority}
      </p>


      <p>
        <strong>Status:</strong>{" "}
        {ticket.status}
      </p>


      <button
        onClick={() =>
          toggleTicketStatus(ticket._id)
        }
      >

        {
          ticket.status === "Resolved"
            ? "Reopen Ticket"
            : "Resolve Ticket"
        }

      </button>


      <br />
      <br />
        <Link to={`/tickets/${ticket._id}/edit`} >
        Edit Ticket</Link>

      <Link to="/tickets">
        Back to Tickets
      </Link>

    </section>

  );

}

export default TicketDetailsPage;
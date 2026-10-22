import { Link } from "react-router-dom";

import StatusBadge from "./StatusBadge";


function TicketCard({
  id,
  title,
  description,
  priority,
  status,
  onToggleStatus,
  onDeleteTicket
}) {

  return (

    <article className="ticket-card">

      <h3>
        {title}
      </h3>


      <p>
        {description}
      </p>


      <p>
        <strong>Priority:</strong>{" "}
        {priority}
      </p>


      <StatusBadge
        status={status}
      />


      <br />


      <button
        onClick={() =>
          onToggleStatus(id)
        }
      >

        {
          status === "Resolved"
            ? "Reopen Ticket"
            : "Resolve Ticket"
        }

      </button>


      {" | "}


      <Link
        to={`/tickets/${id}`}
      >
        View Details
      </Link>

       {" | "}

            <Link
        to={`/tickets/${id}/edit`}
      >
        Edit
      </Link>

      {" | "}

      <button
        onClick={() => {

          const confirmed =
            window.confirm(
              "Delete this ticket?"
            );

          if (confirmed) {

            onDeleteTicket(id);

          }

        }}
      >
        Delete
      </button>

    </article>

  );

}

export default TicketCard;
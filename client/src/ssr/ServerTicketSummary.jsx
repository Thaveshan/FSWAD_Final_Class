function ServerTicketSummary({
  tickets
}) {

  return (

    <section>

      <h1>
        Server Rendered Ticket Summary
      </h1>


      <p>
        Total tickets: {tickets.length}
      </p>


      <ul>

        {tickets.map((ticket) => (

          <li key={ticket._id}>

            {ticket.title}
            {" - "}
            {ticket.status}

          </li>

        ))}

      </ul>

    </section>

  );

}


export default ServerTicketSummary;
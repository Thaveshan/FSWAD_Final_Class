import TicketCard from "./TicketCard";


function TicketList({
  tickets,
  onToggleStatus,
  onDeleteTicket
}) {

  if (tickets.length === 0) {

    return (
      <p>No tickets found.</p>
    );

  }


  return (

    <section>

      {tickets.map((ticket) => (

        <TicketCard
          key={ticket._id}
          id={ticket._id}
          title={ticket.title}
          description={ticket.description}
          priority={ticket.priority}
          status={ticket.status}
          onToggleStatus={onToggleStatus}
          onDeleteTicket={onDeleteTicket}
        />
        

      ))}
    
    </section>

  );

}


export default TicketList;
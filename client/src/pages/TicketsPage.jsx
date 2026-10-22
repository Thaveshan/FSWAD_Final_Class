import TicketList from "../components/TicketList";
import Button from "react-bootstrap/Button";
import { useState } from "react";


function TicketsPage({
  tickets,
  showTickets,
  setShowTickets,
  selectedStatus,
  setSelectedStatus,
  toggleTicketStatus,
  onDeleteTicket,
  loading
}) {


  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const ticketsPerPage = 3;


 /*  const filteredTickets =
    selectedStatus === "All"
      ? tickets
      : tickets.filter(
          (ticket) =>
            ticket.status === selectedStatus
        ); */

  const filteredTickets =
  tickets.filter((ticket) => {

    const matchesStatus =
      selectedStatus === "All" ||
      ticket.status === selectedStatus;


    const searchValue =
      searchTerm
        .trim()
        .toLowerCase();


    const matchesSearch =
      ticket.title
        .toLowerCase()
        .includes(searchValue)
      ||
      ticket.description
        .toLowerCase()
        .includes(searchValue);


    return (
      matchesStatus &&
      matchesSearch
    );

  });

  const indexOfLastTicket =
    currentPage * ticketsPerPage;

  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;

  const paginatedTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);


  const totalTickets =
    tickets.length;


  const openTickets =
    tickets.filter(
      (ticket) =>
        ticket.status === "Open"
    ).length;


  const inProgressTickets =
    tickets.filter(
      (ticket) =>
        ticket.status === "In Progress"
    ).length;


  const resolvedTickets =
    tickets.filter(
      (ticket) =>
        ticket.status === "Resolved"
    ).length;


  if (loading) {

    return (
      <p>Loading tickets...</p>
    );

  }


  return (

    <section>

      <h1>Support Tickets</h1>


      <div>

        <Button variant="primary"
          onClick={() =>
            setShowTickets(
              (currentValue) =>
                !currentValue
            )
          }
        >

          {
            showTickets
              ? "Hide Tickets"
              : "Show Tickets"
          }

        </Button>

      </div>


      <section>

        <h2>Ticket Summary</h2>

        <p>
          Total: {totalTickets}
        </p>

        <p>
          Open: {openTickets}
        </p>

        <p>
          In Progress: {inProgressTickets}
        </p>

        <p>
          Resolved: {resolvedTickets}
        </p>

      </section>

      <div>
        <label htmlFor="ticketSearch">
          Search Tickets:{" "}
        </label>

        <input id="ticketSearch"
          type="text"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(
              event.target.value
            );
            setCurrentPage(1); // Reset to first page on search

          }}
          placeholder="Search by title or description"
        />
      </div>


      <div>

        <label htmlFor="statusFilter">
          Filter by Status:{" "}
        </label>


        <select
          id="statusFilter"
          value={selectedStatus}
          onChange={(event) => {
            setSelectedStatus(
              event.target.value
            );
            setCurrentPage(1); // Reset to first page on filter change
          }}
        >

          <option value="All">
            All
          </option>

          <option value="Open">
            Open
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Resolved">
            Resolved
          </option>

        </select>

      </div>


      {showTickets && (

        <section>

          <h2>
            Current Support Requests
          </h2>


          <p>
            Showing:{" "}
            <strong>
              {selectedStatus}
            </strong>
          </p>


          <p>
            Tickets found:{" "}
            <strong>
              {filteredTickets.length}
            </strong>
          </p>


          {filteredTickets.length === 0 && (

            <p>
              No tickets match the selected status.
            </p>

          )}

          <TicketList
            tickets={paginatedTickets}
            onToggleStatus={
              toggleTicketStatus
            }
            onDeleteTicket={
              onDeleteTicket
            }
          />

          <div>
            <button 
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                (page) => page - 1
              )
            }
            >
              Previous
            </button>

            <span>
              {" "}
              Page {currentPage}
              {" "}
              of {totalPages || 1}
              {" "}
            </span>

            <button disabled={
              currentPage >= totalPages
            }
            onClick={() =>
              setCurrentPage(
                (page) => page + 1
              )
            }
            >
              Next
            </button>
          </div>

        </section>

      )}

    </section>

  );

}


export default TicketsPage;
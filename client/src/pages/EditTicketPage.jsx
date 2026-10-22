import {
  Link,
  useNavigate,
  useParams
} from "react-router-dom";

import TicketForm
  from "../components/TicketForm";


function EditTicketPage({
  tickets,
  loading,
  onUpdateTicket
}) {

  const { id } =
    useParams();

  const navigate =
    useNavigate();


  if (loading) {

    return (
      <p>Loading ticket...</p>
    );

  }


  const ticket =
    tickets.find(
      (ticket) =>
        ticket._id === id
    );


  if (!ticket) {

    return (

      <section>

        <h1>
          Ticket Not Found
        </h1>

        <Link to="/tickets">
          Back to Tickets
        </Link>

      </section>

    );

  }


  async function handleUpdate(
    formData
  ) {

    await onUpdateTicket(
      id,
      formData
    );

    navigate(
      `/tickets/${id}`
    );

  }


  return (

    <section>

      <h1>Edit Ticket</h1>


      <TicketForm
        initialValues={ticket}
        onSubmit={handleUpdate}
        submitLabel="Update Ticket"
      />

    </section>

  );

}


export default EditTicketPage;
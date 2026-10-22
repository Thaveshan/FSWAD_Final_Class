import {
  useNavigate
} from "react-router-dom";

import TicketForm
  from "../components/TicketForm";


function CreateTicketPage({
  onCreateTicket
}) {

  const navigate =
    useNavigate();


  async function handleCreate(formData) {

    await onCreateTicket(formData);

    navigate("/tickets");

  }


  return (

    <section>

      <h1>
        Create Support Ticket
      </h1>


      <TicketForm
        onSubmit={handleCreate}
        submitLabel="Create Ticket"
      />

    </section>

  );

}


export default CreateTicketPage;
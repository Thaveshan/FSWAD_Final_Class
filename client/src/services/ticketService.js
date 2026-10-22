const API_URL = "/api/tickets";


export async function getTickets() {

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to load tickets.");
  }

  return response.json();
}


export async function createTicket(ticketData) {

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(ticketData)
  });


  if (!response.ok) {

    const error = await response.json();

    throw new Error(
      error.message || "Unable to create ticket."
    );
  }


  return response.json();
}


export async function updateTicket(id, ticketData) {

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(ticketData)
    }
  );


  if (!response.ok) {

    const error = await response.json();

    throw new Error(
      error.message || "Unable to update ticket."
    );
  }


  return response.json();
}


export async function deleteTicket(id) {

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE"
    }
  );


  if (!response.ok) {

    const error = await response.json();

    throw new Error(
      error.message || "Unable to delete ticket."
    );
  }


  return response.json();
}
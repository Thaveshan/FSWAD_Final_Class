import {
  useEffect,
  useState
} from "react";

import {
  Routes,
  Route
} from "react-router-dom";

import {
  loginUser,
  getSession,
  logoutUser
} from "./services/authService";

import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket
} from "./services/ticketService";

import Alert from "react-bootstrap/Alert";

import LoginPage from "./pages/LoginPage";

import Header from "./components/Header";
import Navbar from "./components/Navbar";


import HomePage from "./pages/HomePage";
import TicketsPage from "./pages/TicketsPage";
import CreateTicketPage from "./pages/CreateTicketPage";
import TicketDetailsPage from "./pages/TicketDetailsPage";
import EditTicketPage from "./pages/EditTicketPage";
import NotFoundPage from "./pages/NotFoundPage";


function App() {

  const [tickets, setTickets] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [showTickets, setShowTickets] =
    useState(true);

  const [selectedStatus, setSelectedStatus] =
    useState("All");

  const [notification, setNotification] =
    useState("");

  const [user, setUser] = useState(null);

  // ---------------------------------
  // Session Check
  // ---------------------------------

  async function checkSession() {

  try {

    const data =
      await getSession();


    if (data.authenticated) {

      setUser(
        data.user
      );

    }
    else {

      setUser(null);

    }

  }
  catch (error) {

    console.error(
      error.message
    );

  }

}

  // ---------------------------------
  // Login Handler
  // ---------------------------------

async function handleLogin(
  credentials
) {

  const data =
    await loginUser(
      credentials
    );


  setUser(
    data.user
  );


  showNotification(
    `Welcome ${data.user.name}`
  );

}

  // ---------------------------------
  // Logout Handler
  // ---------------------------------

async function handleLogout() {

  await logoutUser();

  setUser(null);


  showNotification(
    "You have logged out."
  );

}

  // ---------------------------------
  // LOAD TICKETS FROM THE API
  // ---------------------------------

  async function loadTickets() {

    try {

      setLoading(true);
      setError("");

      const data =
        await getTickets();

      setTickets(data);

    }
    catch (error) {

      setError(error.message);

    }
    finally {

      setLoading(false);

    }

  }


  // ---------------------------------
  // NOTIFICATION HELPER
  // ---------------------------------

  function showNotification(message) {

    setNotification(message);

    setTimeout(() => {

      setNotification("");

    }, 3000);

  }


  // ---------------------------------
  // CREATE
  // ---------------------------------

  async function handleCreateTicket(
    ticketData
  ) {

    try {

      setError("");

      const createdTicket =
        await createTicket(
          ticketData
        );


      setTickets((current) => [
        ...current,
        createdTicket
      ]);


      showNotification(
        "Ticket created successfully."
      );

    }
    catch (error) {

      setError(error.message);

      throw error;

    }

  }


  // ---------------------------------
  // UPDATE
  // ---------------------------------

  async function handleUpdateTicket(
    id,
    ticketData
  ) {

    try {

      setError("");

      const updatedTicket =
        await updateTicket(
          id,
          ticketData
        );


      setTickets((current) =>
        current.map(
          (ticket) =>
            ticket._id === id
              ? updatedTicket
              : ticket
        )
      );


      showNotification(
        "Ticket updated successfully."
      );

    }
    catch (error) {

      setError(error.message);

      throw error;

    }

  }


  // ---------------------------------
  // TOGGLE STATUS
  // ---------------------------------

  async function toggleTicketStatus(
    ticketId
  ) {

    const ticket =
      tickets.find(
        (ticket) =>
          ticket._id === ticketId
      );


    if (!ticket) {
      return;
    }


    const newStatus =
      ticket.status === "Resolved"
        ? "Open"
        : "Resolved";


    const ticketData = {

      title: ticket.title,

      description:
        ticket.description,

      priority:
        ticket.priority,

      status:
        newStatus

    };


    try {

      setError("");

      const updatedTicket =
        await updateTicket(
          ticketId,
          ticketData
        );


      setTickets((current) =>
        current.map(
          (ticket) =>
            ticket._id === ticketId
              ? updatedTicket
              : ticket
        )
      );


      showNotification(
        `Ticket changed to ${newStatus}.`
      );

    }
    catch (error) {

      setError(error.message);

    }

  }


  // ---------------------------------
  // DELETE
  // ---------------------------------

  async function handleDeleteTicket(id) {

    try {

      setError("");

      await deleteTicket(id);


      setTickets((current) =>
        current.filter(
          (ticket) =>
            ticket._id !== id
        )
      );


      showNotification(
        "Ticket deleted successfully."
      );

    }
    catch (error) {

      setError(error.message);

    }

  }


  // ---------------------------------
  // LOAD TICKETS WHEN APP STARTS
  // ---------------------------------

  useEffect(() => {

    loadTickets();
    checkSession();

  }, []);


  // ---------------------------------
  // INTERFACE
  // ---------------------------------

  return (

    <>

      <Header />

      <Navbar />


      {notification && (

        <Alert variant="success"
        dismissible
        onClose={() => setNotification("")}>

          {notification}

        </Alert>

/*         <div className="notification">

          <span>
            {notification}
          </span>

          <button
            onClick={() =>
              setNotification("")
            }
          >
            X
          </button>

        </div> */

      )}


      {error && (

        <Alert variant="danger" dismissible onClose={() => setError("")}>
          {error}
        </Alert>

/*         <div className="error-message">

          <strong>
            Error:
          </strong>

          {" "}

          {error}

          {" "}

          <button
            onClick={() =>
              setError("")
            }
          >
            X
          </button>

        </div> */

      )}


      <main
        style={{
          fontFamily: "Arial",
          padding: "2rem"
        }}
      >

        <Routes>


          <Route
            path="/"
            element={
              <HomePage />
            }
          />




          <Route
            path="/tickets"
            element={
              <TicketsPage
                tickets={tickets}
                loading={loading}
                showTickets={
                  showTickets
                }
                setShowTickets={
                  setShowTickets
                }
                selectedStatus={
                  selectedStatus
                }
                setSelectedStatus={
                  setSelectedStatus
                }
                toggleTicketStatus={
                  toggleTicketStatus
                }
                onDeleteTicket={
                  handleDeleteTicket
                }
              />
            }
          />


          <Route
            path="/create-ticket"
            element={
              <CreateTicketPage
                onCreateTicket={
                  handleCreateTicket
                }
              />
            }
          />


          <Route
            path="/tickets/:id"
            element={
              <TicketDetailsPage
                tickets={tickets}
                toggleTicketStatus={
                  toggleTicketStatus
                }
              />
            }
          />


          <Route
            path="/tickets/:id/edit"
            element={
              <EditTicketPage
                tickets={tickets}
                loading={loading}
                onUpdateTicket={
                  handleUpdateTicket
                }
              />
            }
          />


          <Route
            path="*"
            element={
              <NotFoundPage />
            }
          />

          <Route
            path="/login"
            element={
              <LoginPage
                user={user}
                onLogin={
                  handleLogin
                }
                onLogout={
                  handleLogout
                }
              />
            }
          />


        </Routes>

      </main>

    </>

  );

}


export default App;
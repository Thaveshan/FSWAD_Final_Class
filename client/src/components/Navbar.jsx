import {
  NavLink
} from "react-router-dom";


function Navbar() {

  function linkClass({
    isActive
  }) {

    return isActive
      ? "nav-link active-link"
      : "nav-link";

  }


  return (

    <nav>

      <NavLink
        to="/"
        className={linkClass}
      >
        Home
      </NavLink>


      <NavLink
        to="/tickets"
        className={linkClass}
      >
        Tickets
      </NavLink>


      <NavLink
        to="/create-ticket"
        className={linkClass}
      >
        Create Ticket
      </NavLink>


      <NavLink
        to="/login"
        className={linkClass}
      >
        Login
      </NavLink>

    </nav>

  );

}


export default Navbar;
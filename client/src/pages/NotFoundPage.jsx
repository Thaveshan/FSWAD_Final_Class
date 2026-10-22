import { Link } from "react-router-dom";


function NotFoundPage() {

  return (

    <section>

      <h1>
        404
      </h1>

      <h2>
        Page Not Found
      </h2>

      <p>
        The page you requested
        does not exist.
      </p>


      <Link to="/">
        Return Home
      </Link>

    </section>

  );

}

export default NotFoundPage;
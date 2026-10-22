import {
  useState
} from "react";


function LoginPage({
  user,
  onLogin,
  onLogout
}) {

  const [email, setEmail] =
    useState(
      "student@aie.demo"
    );


  const [password, setPassword] =
    useState(
      "Password123!"
    );


  const [loginError, setLoginError] =
    useState("");


  async function handleSubmit(
    event
  ) {

    event.preventDefault();

    setLoginError("");


    try {

      await onLogin({
        email,
        password
      });

    }
    catch (error) {

      setLoginError(
        error.message
      );

    }

  }


  if (user) {

    return (

      <section>

        <h1>
          User Session
        </h1>


        <p>
          Logged in as:
          {" "}
          <strong>
            {user.name}
          </strong>
        </p>


        <p>
          Email:
          {" "}
          {user.email}
        </p>


        <p>
          Role:
          {" "}
          {user.role}
        </p>


        <button
          onClick={onLogout}
        >
          Logout
        </button>

      </section>

    );

  }


  return (

    <section>

      <h1>Login</h1>


      {loginError && (

        <p>
          {loginError}
        </p>

      )}


      <form
        onSubmit={
          handleSubmit
        }
      >

        <div>

          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
          />

        </div>


        <div>

          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
          />

        </div>


        <button type="submit">
          Login
        </button>

      </form>

    </section>

  );

}


export default LoginPage;
const AUTH_URL =
  "/api/auth";


export async function loginUser(
  credentials
) {

  const response =
    await fetch(
      `${AUTH_URL}/login`,
      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        credentials:
          "include",

        body:
          JSON.stringify(
            credentials
          )

      }
    );


  const data =
    await response.json();


  if (!response.ok) {

    throw new Error(
      data.message ||
      "Login failed."
    );

  }


  return data;
}


export async function getSession() {

  const response =
    await fetch(
      `${AUTH_URL}/session`,
      {
        credentials:
          "include"
      }
    );


  if (!response.ok) {

    throw new Error(
      "Unable to check session."
    );

  }


  return response.json();
}


export async function logoutUser() {

  const response =
    await fetch(
      `${AUTH_URL}/logout`,
      {

        method: "POST",

        credentials:
          "include"

      }
    );


  const data =
    await response.json();


  if (!response.ok) {

    throw new Error(
      data.message ||
      "Logout failed."
    );

  }


  return data;
}
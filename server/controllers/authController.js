const demoUser = {

  id: "user-001",

  name: "FWAD102 Support User",

  email: "student@aie.demo",

  password: "Password123!",

  role: "Support Staff"

};


function login(req, res) {

  const {
    email,
    password
  } = req.body;


  if (!email || !password) {

    return res.status(400).json({
      message:
        "Email and password are required."
    });

  }


  if (
    email !== demoUser.email ||
    password !== demoUser.password
  ) {

    return res.status(401).json({
      message:
        "Invalid email or password."
    });

  }


  req.session.user = {

    id: demoUser.id,

    name: demoUser.name,

    email: demoUser.email,

    role: demoUser.role

  };


  return res.status(200).json({

    message:
      "Login successful.",

    user:
      req.session.user

  });

}


function getSession(req, res) {

  if (!req.session.user) {

    return res.status(200).json({

      authenticated: false,

      user: null

    });

  }


  return res.status(200).json({

    authenticated: true,

    user:
      req.session.user

  });

}


function logout(req, res) {

  req.session.destroy(
    (error) => {

      if (error) {

        return res.status(500).json({
          message:
            "Unable to log out."
        });

      }


      res.clearCookie(
        "connect.sid"
      );


      return res.status(200).json({
        message:
          "Logout successful."
      });

    }
  );

}


module.exports = {
  login,
  getSession,
  logout
};
const express =
  require("express");


const {
  login,
  getSession,
  logout
} =
  require(
    "../controllers/authController"
  );


const router =
  express.Router();


router.post(
  "/login",
  login
);


router.get(
  "/session",
  getSession
);


router.post(
  "/logout",
  logout
);


module.exports =
  router;
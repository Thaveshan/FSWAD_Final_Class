require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const ticketRoutes = require("./routes/ticketRoutes");

const session = require("express-session");

const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

//added at 18:27 on 22/10/2026
const path = require("path");

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 30
    }
  })
);

////removed at 18:27 on 22/10/2026 | We need / for React now.
/* 
app.get("/", (req, res) => {
  res.send("FWAD102 Issue Tracker API");
}); */

app.use("/api/tickets", ticketRoutes);
app.use("/api/auth", authRoutes);

//added at 18:28 on 22/10/2026
if (
  process.env.NODE_ENV === "production"
) {

  const clientDistPath =
    path.join(
      __dirname,
      "../client/dist"
    );


  app.use(
    express.static(
      clientDistPath
    )
  );


  app.use(
    (req, res, next) => {

      if (
        req.method === "GET" &&
        !req.path.startsWith("/api")
      ) {

        return res.sendFile(
          path.join(
            clientDistPath,
            "index.html"
          )
        );

      }


      next();

    }
  );

}

//Your current frontend already calls relative /api/... URLs, which is ideal for this single-service deployment.

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(
      `Server running at http://localhost:${PORT}`
    );
  });
}

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "FWAD102 Support Ticket API is running"

  });
});

startServer();


/*

//const Ticket = require("./models/Ticket")

let tickets = [
  {
id:1,
title: "Cannot Access LMS",
description: "The student receives an invalid login message.",
priority: "High",
status: "Open"
},

{
id:2,
title: "Password Reset Request",
description: "The student needs help resetting their password.",
priority: "Medium",
status: "In Progress"
},

{
id:3,
title: "Technical Issue with Software",
description: "The student is experiencing issues with the assigned software.",
priority: "High",
status: "Open"
},

{
id:4,
title: "Request for Additional Resources",
description: "The student is requesting additional learning resources.",
priority: "Low",
status: "Resolved"
}
];

app.use(express.json())

app.get("/", (req, res) => { 
    res.send("FWAD102 Issue Tracker API"); 
}); 


app.get("/api/tickets", (req,res) => {
    res.json(tickets);
});


app.post("/api/tickets", (req, res) => {
   // console.log(req.body);
    //res.json(req.body);
    if (!req.body.title || !req.body.description) {
        return res.status(400).json({
            message: "Title and description are required."
        });
    }
    const newTicket = {
        id: tickets.length + 1,
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority || "Medium",
        status: req.body.status || "Open"
    };

    tickets.push(newTicket);
    res.status(201).json(newTicket);
});


app.get("/api/tickets/:id", (req, res) => {
  const ticketId = Number(req.params.id);

  const ticket = tickets.find(
    (ticket) => ticket.id === ticketId
  );

  if (!ticket) {
    return res.status(404).json({
      message: "Ticket not found."
    });
  }

  res.json(ticket);
});

//MongoDB Routes || Api
app.get("/api/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find();

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrieve tickets."
    });
  }
});

app.get("/support", (req, res) => { 
    res.send("The student support route is working."); 
}); 

app.get("/about", (req, res) => { 
    res.send("The student about route is working."); 
}); 

app.get("/status", (req, res) => { 
    res.send("The student status route is working."); 
}); 

app.get("/contact", (req, res) => { 
    res.send("The student contact route is working."); 
}); 

app.listen(PORT, () => { 
    console.log(`Server running at http://localhost:${PORT}`); 
});
*/
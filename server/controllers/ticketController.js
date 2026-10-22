const Ticket = require('../models/Ticket');

async function getTickets(req, res) {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve tickets."
        });
    }
}

async function createTicket(req, res) {
  try {
    const newTicket = new Ticket({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      status: req.body.status
    });

    const savedTicket = await newTicket.save();

    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
}

async function getTicketById(req, res) {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found."
      });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({
      message: "Invalid ticket ID."
    });
  }
}

async function updateTicket(req, res) {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedTicket) {
      return res.status(404).json({
        message: "Ticket not found."
      });
    }

    res.status(200).json(updatedTicket);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
}

async function deleteTicket(req, res) {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(
      req.params.id
    );

    if (!deletedTicket) {
      return res.status(404).json({
        message: "Ticket not found."
      });
    }

    res.status(200).json({
      message: "Ticket deleted successfully."
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
}

module.exports = {
    getTickets,
    createTicket,
    getTicketById, 
    updateTicket,
    deleteTicket
};

const express = require('express');

const {
    getTickets,
    createTicket,
    getTicketById,
    updateTicket,
    deleteTicket
} = require('../controllers/ticketController');

const router = express.Router();

router.get('/', getTickets);
router.post('/', createTicket);
router.get('/:id', getTicketById);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);

module.exports = router;


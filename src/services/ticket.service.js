import Ticket from "../dao/models/ticketModel.js";

const TicketService = {
    generateTicketCode: () => {
        const randomNumber = Math.floor(Math.random() * 1000000000000);
        return `TICKET${randomNumber.toString().padStart(12, '0')}`;
    },

    createTicket: async (code, purchaseDateTime, amount, purchaser) => {
        const newTicket = new Ticket({
            code: code,
            purchaseDateTime: purchaseDateTime,
            amount: amount,
            purchaser: purchaser,
        });
        await newTicket.save();
    },
};

export default TicketService;
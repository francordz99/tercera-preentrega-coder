import Message from "../dao/models/messageModel.js";
import configureSocket from '../config/socketConfig.js';
const { io } = configureSocket();

const messagesController = {
    getChat: async (req, res) => {
        try {
            const messages = await Message.find().sort({ timestamp: 1 });
            res.render('chat', { messages });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener los mensajes del chat');
        }
    },
    postMessage: async (req, res) => {
        try {
            const { nick, contenido } = req.body;
            const newMessage = new Message({
                sender: nick,
                content: contenido,
            });
            await newMessage.save();
            io.emit('newMessage', newMessage);
            const messages = await Message.find().sort({ timestamp: 1 });
            res.render('chat', { messages });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al enviar el mensaje" });
        }
    },
};

export default messagesController;

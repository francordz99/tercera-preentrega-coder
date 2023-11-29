import http from 'http';
import { Server } from 'socket.io';

const configureSocket = (app) => {
    const server = http.createServer(app);
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('Usuario conectado');
        socket.on('newMessage', (message) => {
            io.emit('newMessage', message);
        });
        socket.on('disconnect', () => {
            console.log('Usuario desconectado');
        });
    });

    return { io, server };
};

export default configureSocket;


import { Express } from "express";
import { __dirname, __filename, } from "./utils.js";
import { config } from "./config/dotenvConfig.js";
import { connectDB } from "./config/databaseConfig.js";
import { engine } from "express-handlebars";
import socketIo from 'socket.io';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import authRoutes from "./routes/auth.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import mainRoutes from "./routes/main.routes.js";
import messagesRoutes from "./routes/messages.routes.js";
import productsRoutes from "./routes/products.routes.js";

// Express & Socket

const app = express();
const port = 8080;
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());

// Handlebars

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

// Conexion DB

connectDB();

// Rutas

app.use('/', authRoutes);
app.use('/', cartRoutes);
app.use('/', mainRoutes);
app.use('/', messagesRoutes);
app.use('/', productsRoutes);

// Arranque Del Server

server.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});

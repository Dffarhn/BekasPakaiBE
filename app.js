import "reflect-metadata";
import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./src/database/config.database.js";
import router from "./src/router.js";
import errorHandler from "./src/common/middleware/errorHandler.middleware.js";
import http from "http";
import compression from "compression";
import { associateModels } from "./src/database/associateModels.js";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import chatRoomService from "./src/ChatRooms/chatRoom.service.js";
import chatService from "./src/chat/chat.service.js";
import { authenticateJWT } from "./src/common/middleware/jwt.middleware.js";
import { ROLE_CUSTOMER, ROLE_TOKO } from "./src/roles/role.enum.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001; // Fixed port assignment

// Middleware
app.use(compression());
app.use(cors({
  origin: "http://localhost:5500", // Allow your client app's origin
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(json());
app.use(urlencoded({ extended: true }));

// Initialize HTTP server
const server = http.createServer(app);

// app.get("/api/v1/chatrooms",authenticateJWT([ROLE_CUSTOMER,ROLE_TOKO]), async (req, res) => {
//   try {
//     const userId = req.user.id; // Assuming you have middleware to get user ID from token
//     const rooms = await chatRoomService.getAllRoomUser(userId);
//     res.json(rooms);
//   } catch (error) {
//     console.error("Error fetching chat rooms:", error);
//     res.status(500).json({ error: "Failed to fetch chat rooms" });
//   }
// });


// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5500", // Your client origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware to authenticate the socket connection
io.use((socket, next) => {
  const token = socket.handshake.auth.token; // Ensure the token is sent from the client
  console.log("Token received:", token); // Debugging line
  if (!token) return next(new Error("Missing authentication token"));

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      console.error("JWT verification error:", err); // Debugging line
      return next(new Error("Invalid authentication token"));
    }
    socket.user = decoded;
    next();
  });
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.emit("userInfo", { id: socket.user.id }); 

  socket.on("joinRoom", async ({ otherUserId }) => {
    console.log(otherUserId)
    const userId = socket.user.id; // Authenticated user’s ID
    const room = await chatRoomService.findOrCreateChatRoom(userId, otherUserId);
    const roomId = room.id;

    socket.join(roomId);
    console.log(`User ${userId} joined room: ${roomId}`);

    const messages = await chatService.getChatHistory(roomId);
    socket.emit("previousMessages", messages);
    socket.emit("roomJoined", { roomId, message: "You have joined the room." });
  });

  socket.on("sendMessage", async ({ roomId, senderId, chatText }) => {
    const chat = await chatService.createChat({ chatText, roomId, senderId });
    io.to(roomId).emit("messageReceived", chat);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Routes
app.get("/", (req, res) => {
  res.send("Selamat datang di aplikasi Express.js!");
});

app.use("/api/v1/", router);
app.use(errorHandler);

// Start server after the database is initialized successfully
const startApp = async () => {
  try {
    await sequelize.authenticate();

    // Call associateModels after importing all models
    associateModels();

    await sequelize.sync(); // Sync database tables
    console.log("Database & tables created or updated!");
  } catch (error) {
    console.error("Tidak dapat terhubung ke database:", error);
  }
};

startApp();

// Start the HTTP server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// app.get('/fetch-shipping', async (req, res) => {

//   console.log(req)
//   try {
//     const response = await axios.get(
//       'https://prd-srvc-dshbd-api-ext.kiriminaja.com/api/dm/v1/shipping/express',
//       {
//         params: {
//           subdistrict_origin: '31483',
//           subdistrict_destination: '31485',
//           insurance: 'false',
//           originTitle: 'Jogo Tirto, Berbah, Sleman, DI Yogyakarta, 55573',
//           destinationTitle: 'Abiansemal, Abiansemal, Badung, Bali, 80352',
//           weight: 100,
//           item_value: 50000,
//         },
//         headers: {
//           Authorization: 'Bearer 30626137|IwW5qO7epi5ZOdcTvB8jNz3nREOYViiSWyqNW2vHcd899a5d',
//           'Api-Key': 'base64:RG/ODAHrZ33diOUid/6oRzkUEu1WBVnjKoqgSqle0gA=',
//         },
//       }
//     );

//     // Send the response from the API to the client
//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while fetching the data.' });
//   }
// });

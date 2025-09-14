// server/index.js
import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";

const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.json());

const __dirname = path.resolve();
const roomsFile = path.join(__dirname, "server", "rooms.json");

// ✅ GET /rooms
app.get("/rooms", (req, res) => {
  fs.readFile(roomsFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read rooms file" });
    }
    res.json(JSON.parse(data));
  });
});

// ✅ POST /rooms (add new room)
app.post("/rooms", (req, res) => {
  const newRoom = req.body;

  fs.readFile(roomsFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read rooms file" });
    }

    let rooms = JSON.parse(data);
    rooms.push(newRoom);

    fs.writeFile(roomsFile, JSON.stringify(rooms, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to save room" });
      }
      res.status(201).json(newRoom);
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

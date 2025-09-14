import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 4000;
const ROOMS_FILE = "./rooms.json";

app.use(cors());
app.use(express.json());

// ✅ Read rooms from JSON file
function getRooms() {
  const data = fs.readFileSync(ROOMS_FILE);
  return JSON.parse(data);
}

// ✅ Write rooms to JSON file
function saveRooms(rooms) {
  fs.writeFileSync(ROOMS_FILE, JSON.stringify(rooms, null, 2));
}

// GET /rooms → fetch all rooms
app.get("/rooms", (req, res) => {
  const rooms = getRooms();
  res.json(rooms);
});

// POST /rooms → add new room
app.post("/rooms", (req, res) => {
  const rooms = getRooms();
  const newRoom = req.body;

  if (!newRoom.id || !newRoom.name || !newRoom.x || !newRoom.y) {
    return res.status(400).json({ error: "Missing fields" });
  }

  rooms.push(newRoom);
  saveRooms(rooms);

  res.status(201).json(newRoom);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

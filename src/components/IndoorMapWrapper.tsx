// src/components/IndoorMapWrapper.tsx
import React, { useEffect, useState } from "react";
import MapBackground from "@/components/IndoorMap/MapBackground";
import { graphData, VertexData } from "@/store/graphData"; // still used for graph drawing
import { graph } from "@/algorithms/dijkstra";

interface RoomPayload {
  id: string;
  name: string;
  x: number;
  y: number;
}

function IndoorMapWrapper() {
  const [rooms, setRooms] = useState<RoomPayload[]>([]);
  const [startRoom, setStartRoom] = useState("");
  const [endRoom, setEndRoom] = useState("");
  const [path, setPath] = useState<string[]>([]);
  const [newRoom, setNewRoom] = useState({ id: "", name: "", x: 0, y: 0 });

  // Fetch rooms from server
  useEffect(() => {
    fetch("http://localhost:4000/rooms")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
      });
  }, []);

  const handleFindPath = () => {
    if (!startRoom || !endRoom) {
      alert("Please select both start and end rooms.");
      return;
    }
    const shortestPath = graph.calculateShortestPath(startRoom, endRoom);
    if (!shortestPath || shortestPath.length === 0) {
      alert("⚠️ No path found.");
      setPath([]);
      return;
    }
    setPath(shortestPath);
  };

  const handleAddRoom = async () => {
    if (!newRoom.id || !newRoom.name) {
      alert("Please fill in room ID and name.");
      return;
    }

    const res = await fetch("http://localhost:4000/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRoom),
    });
    if (res.ok) {
      const addedRoom = await res.json();
      setRooms((prev) => [...prev, addedRoom]);
      setNewRoom({ id: "", name: "", x: 0, y: 0 });
      alert("Room added!");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-900 min-h-screen text-white">
      {/* Controls */}
      <div className="flex gap-2 mb-4">
        <select
          value={startRoom}
          onChange={(e) => setStartRoom(e.target.value)}
          className="border rounded p-2 bg-gray-800 text-white"
        >
          <option value="">Select Start</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
        <select
          value={endRoom}
          onChange={(e) => setEndRoom(e.target.value)}
          className="border rounded p-2 bg-gray-800 text-white"
        >
          <option value="">Select End</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleFindPath}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Find Path
        </button>
      </div>

      {/* Add Room Form */}
      <div className="flex gap-2 mb-4 bg-gray-800 p-4 rounded">
        <input
          type="text"
          placeholder="Room ID"
          value={newRoom.id}
          onChange={(e) => setNewRoom({ ...newRoom, id: e.target.value })}
          className="border rounded p-2 bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="Room Name"
          value={newRoom.name}
          onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
          className="border rounded p-2 bg-gray-700 text-white"
        />
        <input
          type="number"
          placeholder="X"
          value={newRoom.x}
          onChange={(e) =>
            setNewRoom({ ...newRoom, x: Number(e.target.value) })
          }
          className="border rounded p-2 bg-gray-700 text-white"
        />
        <input
          type="number"
          placeholder="Y"
          value={newRoom.y}
          onChange={(e) =>
            setNewRoom({ ...newRoom, y: Number(e.target.value) })
          }
          className="border rounded p-2 bg-gray-700 text-white"
        />
        <button
          onClick={handleAddRoom}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Room
        </button>
      </div>

      {/* Map */}
      <MapBackground>
        {/* Draw path */}
        {path.length > 1 && (
          <polyline
            points={path
              .map((id) => {
                const r = rooms.find((room) => room.id === id);
                return r ? `${r.x},${r.y}` : "";
              })
              .filter(Boolean)
              .join(" ")}
            fill="none"
            stroke="cyan"
            strokeWidth={4}
          />
        )}

        {/* Draw room dots */}
        {rooms.map((room) => (
          <g key={room.id}>
            <circle
              cx={room.x}
              cy={room.y}
              r={8}
              fill={path.includes(room.id) ? "yellow" : "red"}
              stroke="black"
              strokeWidth={1}
            />
          </g>
        ))}
      </MapBackground>
    </div>
  );
}

export default IndoorMapWrapper;

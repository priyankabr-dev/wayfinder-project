// src/pages/IndoorNavigation.tsx
import React, { useState } from "react";
import IndoorMapWrapper from "@/components/IndoorMapWrapper";
import roomsData from "@/data/rooms.json"; // ✅ Import your 5 rooms

export default function IndoorNavigation() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  function handleFindPath() {
    if (!start || !end) {
      alert("Please select both start and end");
      return;
    }
    console.log("Finding path from", start, "to", end);
  }

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* ✅ Controls row (always on top) */}
      <div className="p-3 flex gap-3 items-center border-b bg-gray-100">
        <select
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">Select Start</option>
          {roomsData.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>

        <select
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">Select End</option>
          {roomsData.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleFindPath}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Find Path
        </button>
      </div>

      {/* ✅ Map (takes the rest of the screen) */}
      <div className="flex-1">
        <IndoorMapWrapper />
      </div>
    </div>
  );
}

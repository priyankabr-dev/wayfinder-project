export interface VertexData {
  id: string;
  name: string;
  x: number;
  y: number;
}

export interface EdgeData {
  from: string;
  to: string;
}

export interface GraphData {
  vertices: VertexData[];
  edges: EdgeData[];
}

// Convert from your rooms.json
export const graphData: GraphData = {
  vertices: [
    { id: "room1", name: "Meeting Room A", x: 379.35, y: 83.26 },
    { id: "room2", name: "Meeting Room B", x: 69.74, y: 215.78 },
    { id: "room3", name: "Meeting Room C", x: 1049.16, y: 231.44 },
    { id: "room4", name: "Meeting Room D", x: 1384.06, y: 79.65 },
    { id: "room5", name: "Meeting Room E", x: 881.71, y: 77.24 },
  ],
  edges: [
    { from: "room1", to: "room2" },
    { from: "room2", to: "room3" },
    { from: "room4", to: "room5" },
    { from: "room3", to: "room5" }, // ✅ new link so C can reach E
    { from: "room5", to: "room4" }, // ✅ E connects to D
    { from: "room1", to: "room5" }, // ✅ A connects to E (shortcut)
    { from: "room2", to: "room5" },

    // ✅ Add extra edges if you want better connectivity:
    { from: "room3", to: "room5" }, // connect C ↔ E
    { from: "room5", to: "room4" }, // already present, kept for symmetry
  ],
};

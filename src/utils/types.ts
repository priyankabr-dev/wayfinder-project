// src/utils/types.ts (or wherever your types are defined)

export interface VertexData {
  id: string;
  cx: number;        // ✅ keep old code working (x-coordinate)
  cy: number;        // ✅ keep old code working (y-coordinate)
  objectName: string; // ✅ for code still using objectName
  name?: string;      // optional alias if some places already use name
}

export interface EdgeData {
  from: string;
  to: string;
  weight?: number;
  id?: string;        // ✅ added so components referencing edge.id won't fail
}

export interface RoomData {
  id: string;
  name: string;
  x: number;
  y: number;
  edges?: { to: string; distance: number }[];
}

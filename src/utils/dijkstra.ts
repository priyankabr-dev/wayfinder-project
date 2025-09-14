import { Room } from "@/utils/types";

export function dijkstra(rooms: Room[], startId: string, endId: string): string[] {
  const graph: Record<string, { to: string; distance: number }[]> = {};
  rooms.forEach((room) => {
    graph[room.id] = room.edges;
  });

  const distances: Record<string, number> = {};
  const prev: Record<string, string | null> = {};
  const visited: Set<string> = new Set();

  rooms.forEach((room) => {
    distances[room.id] = Infinity;
    prev[room.id] = null;
  });
  distances[startId] = 0;

  while (visited.size < rooms.length) {
    let current: string | null = null;
    let minDist = Infinity;
    for (const id in distances) {
      if (!visited.has(id) && distances[id] < minDist) {
        minDist = distances[id];
        current = id;
      }
    }
    if (!current) break;

    if (current === endId) break;

    visited.add(current);

    for (const edge of graph[current] || []) {
      const newDist = distances[current] + edge.distance;
      if (newDist < distances[edge.to]) {
        distances[edge.to] = newDist;
        prev[edge.to] = current;
      }
    }
  }

  const path: string[] = [];
  let curr: string | null = endId;
  while (curr) {
    path.unshift(curr);
    curr = prev[curr];
  }

  return path;
}

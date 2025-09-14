import { useEffect, useState } from "react";

export interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  edges: { to: string; distance: number }[];
}

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/rooms")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        setLoading(false);
      });
  }, []);

  return { rooms, loading, setRooms };
}

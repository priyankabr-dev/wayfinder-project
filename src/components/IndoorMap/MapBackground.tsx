import floorplan from "@/assets/floorplan.svg";
import { ReactNode } from "react";
import roomsData from "@/data/rooms.json";
interface MapBackgroundProps {
  children?: ReactNode;   // ✅ optional now
}


function MapBackground({ children }: MapBackgroundProps) {
  return (
    <svg
      //same as mall-floor-plan.svg viewBox
      viewBox="0 0 1768.66 327.23"
      className="lg:h-[85vh] lg:w-[75vw] h-[85dvh]"
    >
      <image id="background" width="100%" height="100%" href={floorplan} />
     {/* Room markers */}
      {roomsData.map((room) => (
       <circle
  key={room.id}
  cx={room.x}
  cy={room.y}
  r={10}
  fill="red"
  stroke="black"
  strokeWidth={2}
>
  <title>{room.name}</title>  {/* ✅ this is valid SVG */}
</circle>

      ))}

      {children}
    </svg>
  );
}

export default MapBackground;

//! Dont delete bc might be useful sometime
/*
  const getMousePositionSVG = (event: MouseEvent) => {
    const point = svgRef.current?.createSVGPoint();
    if (point) {
      point.x = event.clientX;
      point.y = event.clientY;
      const transformedPoint = point.matrixTransform(
        svgRef.current?.getScreenCTM()?.inverse()
      );
      console.log(transformedPoint.x, transformedPoint.y);
    }
  };
  useEffect(() => {
    svgRef.current?.addEventListener("click", getMousePositionSVG);
    console.log(svgRef.current?.getBoundingClientRect());
  }, []);
  */

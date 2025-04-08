import UserMapLocation from "../../components/UserMapLocation.jsx";
import AddZoneHook from "./AddZoneHook.jsx";

export default function AddZoneLocation() {
  const { centerPoint, simplifiedData, handlePolygonCoordinates } =
    AddZoneHook();

  return (
    <div
      style={{
        width: "100%",
        height: "50vh",
        overflow: "hidden",
      }}
    >
      <UserMapLocation
        center={centerPoint}
        zoneData={simplifiedData}
        onPress={handlePolygonCoordinates}
        viewOnly={false}
      />
    </div>
  );
}

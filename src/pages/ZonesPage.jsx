import UserMapLocation from "../components/UserMapLocation";

export default function ZonesPage() {
  const centerPoint = { lat: 25.286387, lng: 51.544889 };

  const simplifiedData = [
    {
      id: 1,
      name: "Zone 2 - The Pearl",
      coordinates: [
        { lat: 25.286387, lng: 51.544889 },
        { lat: 25.288055, lng: 51.544222 },
        { lat: 25.289724, lng: 51.545 },
        { lat: 25.2877, lng: 51.537111 },
      ],
      active: true,
    },
    {
      id: 2,
      name: "Zone 3 - Souq Waqif",
      coordinates: [
        { lat: 25.286389, lng: 51.533889 },
        { lat: 25.288056, lng: 51.532222 },
        { lat: 25.289722, lng: 51.535 },
        { lat: 25.2875, lng: 51.536111 },
      ],
      active: false,
    },
  ];

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
        onPress={() => console.log("test")}
        zoneData={simplifiedData}
        viewOnly={true}
      />
    </div>
  );
}

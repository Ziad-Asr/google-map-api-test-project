const AddZoneHook = () => {
  const centerPoint = { lat: 25.276987, lng: 51.520008 };

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

  const handlePolygonCoordinates = (coordinates) => {
    console.log("coordinates");
    console.log(coordinates);
  };

  return {
    centerPoint,
    simplifiedData,
    handlePolygonCoordinates,
  };
};

export default AddZoneHook;

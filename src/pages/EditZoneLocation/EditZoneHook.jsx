import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { getOneZone, updateZone } from "../../redux/actions/zonesActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditZoneHook = () => {
  const center = { lat: 25.276987, lng: 51.520008 };

  const editedZone = useSelector((state) => state.zonesReducers.oneZone);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  let [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [zoneData, setZoneData] = useState(null);
  const [formInputs, setFormInputs] = useState({
    Name: "",
    Name_ar: "",
    Description: "",
    Description_ar: "",
    StartDate: "",
    EndDate: "",
    Status: false,
    Picture: null,
  });

  const handlePolygonCoordinates = (coordinates) => {
    setPolygonCoordinates(coordinates);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormInputs((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 5 * 1024 * 1024) {
      // Max size: 5MB
      setFormInputs((prevInputs) => ({
        ...prevInputs,
        Picture: file,
      }));
    } else {
      toast.error(t("Image size must be less than 5MB"));
    }
  };

  const createFormData = () => {
    const formData = new FormData();

    if (
      polygonCoordinates.length > 0 &&
      polygonCoordinates[0].Latitude !== undefined &&
      polygonCoordinates[0].Longitude !== undefined
    ) {
      polygonCoordinates = polygonCoordinates.map(
        ({ Latitude, Longitude }) => ({
          lat: Latitude,
          lng: Longitude,
        })
      );
    }

    Object.entries(formInputs).forEach(([key, value]) => {
      if (key === "Picture" && value) {
        formData.append("Picture", value);
      } else {
        formData.append(key, value);
      }
    });
    formData.append("Pins", JSON.stringify(polygonCoordinates));
    return formData;
  };

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    if (
      !formInputs.Name ||
      !formInputs.Name_ar ||
      !formInputs.Description ||
      !formInputs.Description_ar ||
      !formInputs.Picture ||
      polygonCoordinates.length < 3
    ) {
      toast.error(
        t("Please fill all required fields and draw a completed polygon")
      );
      return;
    }
    try {
      const formData = createFormData();
      await dispatch(updateZone(id, formData));
      navigate("/admin/zones");
      toast.success(t("Zone updated successfully"));
    } catch (error) {
      console.error("Error editing zone:", error);
      toast.error(t("Error editing zone"));
    }
  };

  useEffect(() => {
    dispatch(getOneZone(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (editedZone?.location) {
      setFormInputs({
        Name: editedZone.location.Name,
        Name_ar: editedZone.location.Name_ar,
        Description: editedZone.location.Description,
        Description_ar: editedZone.location.Description_ar,
        StartDate: editedZone.location.StartDate
          ? new Date(editedZone.location.StartDate).toISOString().split("T")[0]
          : "",
        EndDate: editedZone.location.EndDate
          ? new Date(editedZone.location.EndDate).toISOString().split("T")[0]
          : "",
        Picture: editedZone.location.Picture,
        Status: editedZone.location.Status.Status === "Active" ? true : false,
      });

      setPolygonCoordinates(editedZone.location.Pins);
    }
  }, [editedZone]);

  useEffect(() => {
    if (polygonCoordinates && polygonCoordinates.length > 0) {
      const extractedZone = {
        id: polygonCoordinates[0]._id,
        name: polygonCoordinates[0].Name,
        color:
          polygonCoordinates[0].Status?.Status === "Active"
            ? "#00FF00"
            : "#FF0000",
        coordinates: polygonCoordinates.map((pin) => ({
          lat: parseFloat(pin.Latitude),
          lng: parseFloat(pin.Longitude),
        })),
      };

      setZoneData([extractedZone]);
    } else {
      setZoneData(null);
    }
  }, [polygonCoordinates]);

  return {
    t,
    center,
    formInputs,
    zoneData,
    handlePolygonCoordinates,
    handleInputChange,
    handleImageChange,
    onsubmitHandler,
  };
};

export default EditZoneHook;

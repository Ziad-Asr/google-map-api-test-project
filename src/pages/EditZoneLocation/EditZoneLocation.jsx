import styles from "../../App.css";
import UserMapLocation from "../../components/UserMapLocation.jsx";
import EditZoneHook from "./EditZoneHook.jsx";

export default function EditZoneLocation() {
  const {
    t,
    center,
    formInputs,
    zoneData,
    handlePolygonCoordinates,
    handleInputChange,
    handleImageChange,
    onsubmitHandler,
  } = EditZoneHook();

  return (
    <div className="flex-grow-1" style={{ padding: "20px" }}>
      <div
        style={{
          width: "100%",
          height: "50vh",
          overflow: "hidden",
        }}
      >
        <UserMapLocation
          center={center}
          onPress={handlePolygonCoordinates}
          zoneData={zoneData}
          viewOnly={false}
        />
      </div>

      <form className={styles.form} onSubmit={onsubmitHandler}>
        <div className={styles["input-wrapper"]}>
          <div className="d-flex flex-column gap-2 w-100">
            <label htmlFor="Name" className={styles.label}>
              {t("en_name")}
            </label>
            <input
              name="Name"
              type="text"
              className={styles.input}
              placeholder={t("Enter zone english name")}
              value={formInputs.Name}
              onChange={handleInputChange}
            />
          </div>

          <div className="d-flex flex-column gap-2 w-100">
            <label htmlFor="Name_ar" className={styles.label}>
              {t("ar_name")}
            </label>
            <input
              name="Name_ar"
              type="text"
              className={styles.input}
              placeholder={t("Enter zone arabic name")}
              value={formInputs.Name_ar}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className={styles["input-wrapper"]}>
          <div className="d-flex flex-column gap-2 w-100">
            <label htmlFor="Description" className={styles.label}>
              {t("en_desc")}
            </label>
            <textarea
              name="Description"
              placeholder={t("Enter zone english description")}
              className={styles.textarea}
              value={formInputs.Description}
              onChange={handleInputChange}
            />
          </div>

          <div className="d-flex flex-column gap-2 w-100">
            <label htmlFor="Description_ar" className={styles.label}>
              {t("ar_desc")}
            </label>
            <textarea
              name="Description_ar"
              placeholder={t("Enter zone arabic description")}
              className={styles.textarea}
              value={formInputs.Description_ar}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="d-flex gap-4 w-100">
          <div className="d-flex flex-column gap-2 w-100">
            <label htmlFor="image_upload" className={styles.label}>
              {t("upload_zones_image")}
            </label>

            {formInputs.Picture && (
              <div className={styles["image-preview"]}>
                <img
                  src={
                    typeof formInputs.Picture === "string"
                      ? formInputs.Picture
                      : URL.createObjectURL(formInputs.Picture)
                  }
                  alt="Zone Preview"
                  className={styles["preview-img"]}
                />
              </div>
            )}

            <input
              type="file"
              id="image_upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="image_upload" className={styles["label-img"]}>
              {formInputs?.Picture?.name ||
                formInputs?.Picture?.split("/").pop() ||
                t("Choose_Image")}
            </label>
          </div>

          <div className="d-flex flex-column gap-4 w-100">
            <div className="d-flex flex-column w-100 gap-2">
              <label htmlFor="StartDate" className={styles.label}>
                {t("start_date")}
              </label>
              <input
                type="date"
                name="StartDate"
                className={styles.input}
                value={formInputs.StartDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="d-flex flex-column w-100 gap-2">
              <label htmlFor="EndDate" className={styles.label}>
                {t("end_date")}
              </label>
              <input
                type="date"
                name="EndDate"
                className={styles.input}
                value={formInputs.EndDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="d-flex w-50 align-items-center gap-2">
              <label htmlFor="Status" className={styles["checkbox-label"]}>
                {t("status")}
              </label>
              <input
                type="checkbox"
                name="Status"
                className={styles["checkbox-input"]}
                checked={formInputs.Status}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <button type="submit" className={styles["submit-btn"]}>
          {t("Edit_Zone")}
        </button>
      </form>
    </div>
  );
}

import SharePhotosButton from "./SharePhotosButton";
import { useNavigate } from "react-router-dom";
import "./PhotosPreview.css";
import { useEffect, useState } from "react";

const PhotosPreview = ({ guests_pictures, eventId, type, eventDate }) => {
  const navigate = useNavigate();
  const [showPhotosPreview, setShowPhotosPreview] = useState(false);

  useEffect(() => {
    // Récupère la date actuelle
    const now = new Date();
    const dateObj = new Date(eventDate);

    // Vérifie si l'événement est déjà commencé
    if (now >= dateObj) {
      setShowPhotosPreview(true); // Affiche le composant si la date est atteinte ou passée
    }
  }, [eventDate]);
  if (!showPhotosPreview) return null;

  return (
    <div
      className={`photos-preview-container ${
        type === "desktop" ? "desktop-photos-preview" : "mobile-photos-preview"
      }`}
    >
      <div className="header-photos-preview-container">
        <span>Photos</span>
        {guests_pictures.length > 0 && (
          <span
            onClick={() => navigate(`/galery/${eventId}`)}
            style={{ cursor: "pointer" }}
          >
            Voir tout
          </span>
        )}
      </div>
      {guests_pictures.length > 0 && (
        <div className="photos-preview">
          {guests_pictures.slice(0, 3).map((picture, index) => (
            <img
              key={index}
              src={picture.url}
              className="preview-photo-event-page"
            />
          ))}
          {guests_pictures.length > 3 && (
            <div
              className="more-photos"
              onClick={() => navigate(`/galery/${eventId}`)}
            >
              <img
                src={guests_pictures[3].url}
                className="preview-photo-event-page blur-preview"
              />
              <div className="overlay-preview-photo">
                <span>+ {guests_pictures.length - 3}</span>
              </div>
            </div>
          )}
        </div>
      )}
      <SharePhotosButton eventId={eventId} />
    </div>
  );
};

export default PhotosPreview;

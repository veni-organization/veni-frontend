import SharePhotosButton from "./SharePhotosButton";
import { IoArrowForward } from "react-icons/io5";
import "./PhotosPreview.css";

const PhotosPreview = ({
  guests_pictures,
  eventId,
  setIsLoading,
  isLoading,
}) => {
  return (
    <div className="photos-preview-container">
      <div className="header-photos-preview-container">
        <span>Photos</span>
        {guests_pictures.length > 0 && <span>Voir tout</span>}
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
            <div className="more-photos">
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

      <SharePhotosButton setIsLoading={setIsLoading} eventId={eventId} />
    </div>
  );
};

export default PhotosPreview;

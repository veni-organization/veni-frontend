import { useState, useContext, useEffect } from "react";

const Links = ({ links, setLinks }) => {
  const [newLink, setNewLink] = useState("");

  const handleAddLink = (event) => {
    event.preventDefault();
    if (newLink) {
      setLinks([...links, { label: newLink }]);
      setNewLink("");
    }
  };

  const handleDeleteLink = (event, index) => {
    event.preventDefault();
    setLinks((prevLinks) => [
      ...prevLinks.filter((_, linkIndex) => linkIndex !== index),
    ]);
  };

  return (
    <div className="links">
      <label htmlFor="links">
        Liens ({Array.isArray(links) ? links.length : 0})
      </label>
      <div className="link-input">
        <input
          type="url"
          id="links"
          placeholder="+ ajoute les liens pertinents"
          value={newLink}
          onChange={(event) => setNewLink(event.target.value)}
        />
        <button
          className={newLink.length === 0 ? "none" : "save-link"}
          onClick={handleAddLink}
        >
          Valider
        </button>
      </div>
      {Array.isArray(links) &&
        links.map((link, index) => (
          <div key={index} className="links-saved">
            <p className="link-saved">{link.label}</p>
            <button
              onClick={(event) => handleDeleteLink(event, index)}
              className="delete-link"
            >
              Supprimer
            </button>
          </div>
        ))}
      {/* {console.log("links --->", links)} */}
    </div>
  );
};

export default Links;

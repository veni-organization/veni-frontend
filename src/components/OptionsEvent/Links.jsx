import { useState } from "react";

const Links = () => {
  const [links, setLinks] = useState([]);
  const [newLinks, setNewLinks] = useState("");

  const newLink = (event) => {
    event.preventDefault();
    if (newLink) {
      setLinks([...links, { label: newLinks, completion: false }]);
      setNewLinks("");
    }
  };

  const deleteLink = (event, index) => {
    event.preventDefault();
    const updatedList = links.filter((_, linkIndex) => linkIndex !== index);
    setLinks(updatedList);
  };

  return (
    <div className="links">
      <label htmlFor="links">Liens</label>
      {links.map((link, index) => (
        <div key={index} className="links-saved">
          <p className="link-saved">{link.label}</p>
          <button
            onClick={(event) => deleteLink(event, index)}
            className="delete-link"
          >
            Supprimer
          </button>
        </div>
      ))}
      <div className="link-input">
        <input
          type="url"
          id="links"
          placeholder="+ ajoute les liens pertinents"
          value={newLinks}
          onChange={(event) => {
            setNewLinks(event.target.value);
          }}
        />
        <button
          className={newLinks.length === 0 ? "none" : "save-link"}
          onClick={(event) => newLink(event)}
        >
          Valider
        </button>
      </div>
    </div>
  );
};

export default Links;

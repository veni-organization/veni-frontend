const Link = () => {
  const [links, setLinks] = useState([]);

  return (
    <div>
      <label htmlFor="links">Liens</label>
      <input
        type="url"
        id="links"
        placeholder="+ ajoute les liens pertinents"
      />
    </div>
  );
};

export default Link;

import "./Avatar.css";

const avatar = ({ user, size }) => {
  const { name, avatar } = user;

  // Random gradients
  const gradients = [
    "red-linearGradient",
    "pink-linearGradient",
    "green-linearGradient",
    "yellow-linearGradient",
  ];

  // Random gradient select
  const randomGradient =
    gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <div>
      {avatar ? (
        <div style={{ backgroundImage: `url(${avatar})` }}></div>
      ) : (
        <div
          className={`default-avatar ${randomGradient}`}
          style={{ height: size, width: size }}
        >
          <p className="firstLetter">{name[0]}</p>
        </div>
      )}
    </div>
  );
};

export default avatar;

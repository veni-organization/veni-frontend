import "./Avatar.css";

const avatar = ({ user, size }) => {
  const { name, avatar } = user[0];

  // Random gradients
  const gradients = [
    "red-linearGradient",
    "pink-linearGradient",
    "green-linearGradient",
    "yellow-linearGradient",
    "blue-linearGradient",
    "orange-linearGradient",
    "purple-linearGradient",
    "gray-linearGradient",
  ];

  // Random gradient select
  const randomGradient =
    gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <div>
      {avatar ? (
        <div
          style={{
            backgroundImage: `url(${avatar})`,
            height: size,
            width: size,
            borderRadius: "50%",
            backgroundSize: "cover",
            border: "2px solid #fff",
            borderColor: "rgba(255, 255, 255, 0.5)",
          }}
        ></div>
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

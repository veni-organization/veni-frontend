import Avatar from "./Avatar";
import "./ProfileCard.css";

const ProfileCard = ({ users }) => {
  // Check if alone
  if (!users) {
    return <div></div>;
  }

  // Check if alone
  if (users.length === 1) {
    return (
      <div className="hosts-infos">
        <Avatar user={users} size={"24px"} />
        <p className="event-host-name">{users[0].name}</p>
      </div>
    );
  }

  return (
    <div className="hosts-infos">
      <div className="hosts-avatar">
        {users.map((host, index) => {
          return <Avatar key={index} user={host} size={"24px"} />;
        })}
      </div>
      <div className="hosts-name">
        {users.map((host, index) => {
          return (
            <span key={index}>
              <p className="event-host-name">
                {host.name} {index < users.length - 1 && " & "}
              </p>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileCard;

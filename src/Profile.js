import React from "react";

function Profile({ username, name }) {
  return (
    <div>
      <p>{username}</p>
      <span>({name})</span>
    </div>
  );
}

export default Profile;

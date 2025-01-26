/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import UserProfile from "./user-profile";
import UserLogin from "./user-login";

const UserDropdown = ({ auth }: { auth: any }) => {
  if (auth) {
    return <UserProfile auth={auth} />;
  }

  return <UserLogin />;
};

export default UserDropdown;

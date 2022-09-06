import React from "react";
import { getAvatarImgSrc, getDefaultAvatarImgSrc } from "../utilities/AvatarUtility";

const UserBadge = ({ user }) => {
    if (!user) {
        throw new Error("Invalid user property for UserBadge");
    }

    let avatarImgSrc = getAvatarImgSrc(user.preferredCity);
    if (avatarImgSrc === null) {
        avatarImgSrc = getDefaultAvatarImgSrc();
    }
    return (
        <div className="user-badge" style={{ visibility: "hidden" }}>
            <img className="user-badge-img" src={avatarImgSrc} title={user.preferredCity} />
            <div className="user-badge-txt">{user.name}</div>
        </div>
    )
};

export default UserBadge;
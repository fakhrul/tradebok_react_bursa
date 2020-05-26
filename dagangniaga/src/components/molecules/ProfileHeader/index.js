import React from "react";
import {View} from "react-native";
import ProfileCard from "../ProfileCard";

  const ProfileHeader = ({
    avatar,
    following,
    followers,
    name,
    handle,
    about,
    onEdit,
    onFollowingOpen,
    onFollowersOpen,
  }) => {
    return (
      <View>
        <ProfileCard
          editable
          onEdit={onEdit}
          onFollowingOpen={onFollowingOpen}
          onFollowersOpen={onFollowersOpen}
          avatar={avatar}
          following={following}
          followers={followers}
          name={name}
          handle={handle}
          about={about}
        />
      </View>
    );
  };

  export default ProfileHeader;
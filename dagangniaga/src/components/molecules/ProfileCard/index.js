import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {colors, parseConnectionsCount} from "../../../utils";
import {MaterialIcons} from "@expo/vector-icons";

const Connections = ({total, type, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={onPress}
      style={styles.connections}
    >
      <Text style={styles.connectionsText}>{total}</Text>
      <Text style={styles.connectionsType}>{type}</Text>
    </TouchableOpacity>
  );
};

const EditProfile  = ({ onEdit }) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onEdit} style={styles.editProfile}>
      <MaterialIcons name='edit' size={16} color={colors.white} />
    </TouchableOpacity>
  );
};


const ProfileCard = ({avatar, editable, onEdit, onFollowingOpen, onFollowersOpen, following, followers, name, handle, renderInteractions, about}) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Connections
          onPress={onFollowingOpen}
          total={parseConnectionsCount(following)}
          type="FOLLOWING"
        />
        <ImageBackground
          source={{ uri: avatar ? avatar : "" }}
          style={styles.avatar}
          imageStyle={styles.avatarImage}
        >
          {editable && <EditProfile onEdit={onEdit} />}
        </ImageBackground>
        <Connections
          onPress={onFollowersOpen}
          total={parseConnectionsCount(followers)}
          type="FOLLOWERS"
        />
      </View>
      <View style={styles.name}>
        <Text style={styles.usernameText}>{name}</Text>
        <Text style={styles.handleText}>{handle}</Text>
      </View>
      {renderInteractions && renderInteractions()}
      <View style={styles.about}>
        <Text style={styles.aboutTitle}>About</Text>
        <Text style={styles.aboutText}>{about}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 4,
        paddingHorizontal: 10
      },
      info: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      avatar: {
        height: 120,
        width: 120
      },
      avatarImage: {
        backgroundColor: colors.placeholder,
        borderRadius: 120,
      },
      editProfile: {
        position: 'absolute',
        bottom: -10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        width: 60,
        height: 32,
        borderWidth: 2,
        borderColor: colors.base,
        backgroundColor: colors.accent
      },
      connections: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      connectionsText: {
        fontSize: 24,
        color: colors.text01
      },
      connectionsType: {
        fontSize:14,
        color: colors.text02,
        marginTop: 5
      },
      name: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16
      },
      usernameText: {
        fontSize:24,
        color: colors.text01
      },
      handleText: {
        fontSize:16,
        color: colors.text02,
        marginTop: 5
      },
      about: {
        padding: 16,
        marginTop: 16,
        backgroundColor: colors.accent,
        borderRadius: 10,
        marginBottom: 10
      },
      aboutTitle: {
        fontSize:16,
        color: colors.white,
      },
      aboutText: {
        fontSize:16,
        color: colors.white,
        marginTop: 5,
      }
});

export default ProfileCard;

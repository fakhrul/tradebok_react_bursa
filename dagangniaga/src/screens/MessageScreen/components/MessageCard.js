import { useMutation } from '@apollo/react-hooks';
import React, { useContext, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
// import { useNavigation } from 'react-navigation-hooks';
import { MUTATION_SEEN_MESSAGE, MUTATION_DELETE_CHAT } from '../../../graphql/mutation';
import { NativeImage, DeleteCardRightActions } from '../../../components';
import { colors,longPressDeleteNotification } from '../../../utils';
import {Context as AuthContext} from "../../../context/AuthContext";
import moment from "moment";

// const OnlineDotColor = {
//     true: '#4caf50',
//     false: '#BBBBBB'
//   };

  
const MessageCard = ({ navigation,  chatId, participantId, avatar, handle, authorId, messageId, messageBody, seen, time, isOnline }) => {

  const { state } = useContext(AuthContext);
  const  parsedTime  = moment(time).fromNow();
  // const { navigate } = useNavigation();
  const [messageSeen] = useMutation(MUTATION_SEEN_MESSAGE);
  const [deleteChat, { loading: deleteChatLoading, called: deleteChatCalled }] = useMutation(MUTATION_DELETE_CHAT);

  const setSeenAndNavigate = () => {
    if (authorId !== state.userId) {
      messageSeen({ variables: { messageId } });
    }
    navigation.navigate("conversationFlow", { chatId, avatar, handle, targetId: participantId })
  };

  const isHighlighted = authorId !== state.userId && !seen;

  const highlightStyle = isHighlighted ? {
    color: colors.text01
  } : null;

  // const onlineDotColor = OnlineDotColor[isOnline as any];
  const swipeableRef = useRef();

  const onDelete = () => {
    if (!deleteChatLoading && !deleteChatCalled) {
      longPressDeleteNotification(() => {
        // @ts-ignore
        swipeableRef.current.close();
        deleteChat({ variables: { chatId } });
      });
    }
  };

  const renderRightActions = (progress, dragX) => (
    <DeleteCardRightActions
      progress={progress}
      dragX={dragX}
      onDelete={onDelete}
    />
  );

  return (
    // @ts-ignore
    <Swipeable ref={swipeableRef} useNativeAnimations rightThreshold={-80} renderRightActions={renderRightActions}>
      <TouchableOpacity activeOpacity={0.90} onPress={setSeenAndNavigate} style={styles.container}>
        <View style={styles.avatar}>
          <NativeImage
            uri={avatar}
            style={styles.avatarImage}
          />
          <View style={[styles.onlineDot]} />
        </View>
        <View style={styles.info}>
          <Text style={styles.handleText}>{handle}{' '}</Text>
          <View style={styles.content}>
            <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.messageText, highlightStyle]}>
              {messageBody}
            </Text>
            <Text style={[styles.timeText, highlightStyle]}>
              {` · ${parsedTime}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles =  StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 5
  },
  avatar: {
    height: 50,
    width: 50
  },
  avatarImage: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: colors.placeholder
  },
  onlineDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    bottom: 2.5,
    right: 2.5,
    borderRadius: 10
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10
  },
  handleText: {
    fontSize: 16,
    color: colors.text01
  },
  content: {
    flexDirection: 'row',
    paddingTop: 5
  },
  messageText: {
    fontSize:14,
    maxWidth: '70%',
    color: colors.text02
  },
  timeText: {
    fontSize:14,
    color: colors.text02
  }
});

export default MessageCard;
import { useLazyQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { MUTATION_ADD_MESSAGE, MUTATION_CONNECT_CHAT_TO_USERS } from '../../graphql/mutation';
import { QUERY_CHAT } from '../../graphql/query';
import { SUBSCRIPTION_CHAT } from '../../graphql/subscription';
import { ConversationScreenPlaceholder, Header } from '../../components';
// import { transformMessages } from '@app/utils/shared';
// import ChatHeaderAvatar from './components/ChatHeaderAvatar';
// import CustomBubble from './components/CustomBubble';
// import CustomComposer from './components/CustomComposer';
// import CustomInputToolbar from './components/CustomInputToolbar';
// import CustomMessageText from './components/CustomMessageText';
// import CustomSend from './components/CustomSend';
// import CustomScrollToBottom from './components/CustomScrollToBottom';
// import { ifIphoneX } from 'react-native-iphone-x-helper';
import { colors, transformMessages } from "../../utils";
import { Context as AuthContext } from "../../context/AuthContext";

const ConversationScreen = ({ navigation }) => {
    const chatId = navigation.getParam('chatId');
    const handle = navigation.getParam('handle');
    const avatar = navigation.getParam('avatar');
    const targetId = navigation.getParam('targetId');

    const { state } = useContext(AuthContext);

    const [messages, setMessages] = useState([]);

    const [queryChat, {
        called: chatQueryCalled,
        data: chatQueryData,
        loading: chatQueryLoading,
        error: chatQueryError
    }] = useLazyQuery(QUERY_CHAT, {
        variables: { chatId },
        fetchPolicy: 'network-only'
    });
    const { data: chatSubscriptionData, loading: chatSubscriptionLoading } = useSubscription(SUBSCRIPTION_CHAT, {
        variables: { chatId }
    });
    const [addMessage] = useMutation(MUTATION_ADD_MESSAGE);
    const [connectChat] = useMutation(MUTATION_CONNECT_CHAT_TO_USERS);

    useEffect(() => {
        if (!chatSubscriptionLoading) {
            setMessages(chatSubscriptionData.chat.messages);
        } else if (chatSubscriptionLoading) {
            if (chatQueryCalled && !chatQueryLoading) {
                setMessages(chatQueryData.chat.messages);
            } else if (!chatQueryCalled) {
                queryChat();
            }
        }
    }, [chatQueryData, chatQueryCalled, chatQueryLoading, chatSubscriptionData, chatSubscriptionLoading]);

    const onSend = async updatedMessages => {
        const isFirstMessage = messages.length === 0;
        const [updatedMessage] = updatedMessages;
        if (isFirstMessage) {
            await connectChat({
                variables: {
                    chatId,
                    userId: state.userId,
                    targetId
                }
            });
        }
        addMessage({
            variables: {
                chatId,
                authorId: state.userId,
                body: updatedMessage.text
            }
        });
    };

    const navigateToProfile = () => {
        navigate("profileViewFlow", { userId: targetId });
    };

    const onMorePress = () => {

    }
    let content = <ConversationScreenPlaceholder />

    if (chatQueryCalled && !chatQueryLoading && !chatQueryError) {
        const transform = transformMessages(messages);

        content = (
            <GiftedChat
                scrollToBottom
                alwaysShowSend
                inverted={false}
                maxInputLength={200}
                messages={transform}
                // scrollToBottomComponent={CustomScrollToBottom}
                textInputProps={{ disable: true }}
                // renderComposer={composerProps => <CustomComposer {...composerProps} />}
                // renderMessageText={CustomMessageText}
                // renderBubble={CustomBubble}
                // renderSend={CustomSend}
                // renderInputToolbar={CustomInputToolbar}
                onSend={onSend}
                onPressAvatar={navigateToProfile}
                user={{ _id: state.userId }}
                // bottomOffset={ifIphoneX(20, -10)}
                keyboardShouldPersistTaps={null}
                listViewProps={{ showsVerticalScrollIndicator: false, style: { marginBottom: 16 } }}
            />
        );
    }

    return (
        <View style={styles.container}>
            {/* <GoBackHeader
                title={handle}
                onTitlePress={navigateToProfile}
                iconSize={IconSizes.x7}
                ContentLeft={() => <ChatHeaderAvatar avatar={avatar} onPress={navigateToProfile} />}
                titleStyle={styles().headerTitleStyle}
            /> */}
            <Header
                isBackButton
                title={handle}
                navigation={navigation}
                onPress={onMorePress}
            ></Header>
            {content}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.base
    },
    headerTitleStyle: {
        marginLeft: 0
    }
});

export default ConversationScreen;
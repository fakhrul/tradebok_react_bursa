import { useQuery } from '@apollo/react-hooks';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import EmptyNotifications from '../../resources/empty-notifications.svg';
import { Context as AuthContext } from '../../context/AuthContext';
import { QUERY_NOTIFICATION } from '../../graphql/query';
import { Header, NotificationScreenPlaceholder, SvgBanner } from '../../components';
import NotificationCard from './components/NotificationCard';
import { colors } from "../../utils";

const NotificationScreen = ({ navigation }) => {
    const { state } = useContext(AuthContext);

    const { data, loading, error } = useQuery(QUERY_NOTIFICATION, {
        variables: { userId: state.userId },
        pollInterval: 2000
    });

    const onMorePress = () => {

    }

    const renderItem = ({ item }) => {
        const { id: notificationId, actionUser, type, resourceId, createdAt } = item;

        return (
            <NotificationCard
                navigation={navigation}
                notificationId={notificationId}
                avatar={actionUser.avatar}
                handle={actionUser.handle}
                type={type}
                resourceId={resourceId}
                time={createdAt}
            />
        );
    };

    let content = <NotificationScreenPlaceholder />;

    if (!loading && !error) {
        const { notifications } = data;
        content = (
            <FlatGrid
                itemDimension={responsiveWidth(85)}
                showsVerticalScrollIndicator={false}
                items={notifications}
                ListEmptyComponent={() => <SvgBanner Svg={EmptyNotifications} spacing={20} placeholder='No notifications yet' />}
                style={styles.notificationList}
                spacing={20}
                renderItem={renderItem}
            />
        );
    }

    return (
        <View style={styles.container}>
            <Header
                title="Notifications"
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
    notificationList: {
        flex: 1,
        paddingHorizontal: 4
    }
});

export default NotificationScreen;
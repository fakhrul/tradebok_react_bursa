import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import EmptyConnectionsBanner from '../../../resources/empty-connections.svg';
import { BottomSheetHeader, SvgBanner, ConnectionsPlaceholder, UserCard } from '../../../components';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER_CONNECTIONS } from '../../../graphql/query';
import { Context as AuthContext } from "../../../context/AuthContext";
import { colors } from "../../../utils";

const NewMessageBottomSheet = React.forwardRef(({ onConnectionSelect }, ref) => {

    const { state } = useContext(AuthContext);

    const { data, loading, error } = useQuery(QUERY_USER_CONNECTIONS, {
        variables: { userId: state.userId, type: "FOLLOWING" },
        fetchPolicy: 'network-only'
    });

    let content = <ConnectionsPlaceholder />;

    const ListEmptyComponent = () => (
        <SvgBanner
            Svg={EmptyConnectionsBanner}
            placeholder={`You're not following anyone`}
            spacing={16}
        />
    );

    const renderItem = ({ item }) => {
        const { id, avatar, handle, name } = item;
        return (
            <UserCard
                userId={id}
                avatar={avatar}
                handle={handle}
                name={name}
                onPress={() => onConnectionSelect(id, avatar, handle)}
            />
        );
    };

    if (!loading && !error) {
        const { userConnections } = data;
        content = (
            <FlatGrid
                bounces={false}
                itemDimension={responsiveWidth(85)}
                showsVerticalScrollIndicator={false}
                items={userConnections}
                itemContainerStyle={styles.listItemContainer}
                contentContainerStyle={styles.listContentContainer}
                ListEmptyComponent={ListEmptyComponent}
                style={styles.listContainer}
                spacing={20}
                renderItem={renderItem}
            />
        );
    }

    return (
        <Modalize
            //@ts-ignore
            ref={ref}
            scrollViewProps={{ showsVerticalScrollIndicator: false }}
            modalStyle={styles.container}>
            <BottomSheetHeader
                header={`Let's talk`}
                subHeader='Connect with your friends'
            />
            <View style={styles.content}>
                {content}
            </View>
        </Modalize>
    );
});

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 20,
        backgroundColor: colors.base
    },
    content: {
        flex: 1,
        paddingBottom: responsiveHeight(5)
    },
    listContainer: {
        flex: 1
    },
    listItemContainer: {
        width: '106%'
    },
    listContentContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});

export default NewMessageBottomSheet;
import React from 'react';
import Spacer from '../Spacer';
import {withNavigation} from 'react-navigation';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const NavLink = ({navigation, text, routeName}) => {
    return(
        <TouchableOpacity onPress= {() => navigation.navigate({routeName})}>
            <Spacer>
                <Text style={styles.link}>
                    {text}
                </Text>
            </Spacer>
        </TouchableOpacity>
    );
};

const styles  = StyleSheet.create({
    link: {
        color: "#A5B1C2",
    }
});

export default withNavigation(NavLink);
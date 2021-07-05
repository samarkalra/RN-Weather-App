import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Title } from 'react-native-paper';

const Header = ({ appName }) => {
    return (
        <Appbar.Header
            theme={{
                colors: {
                    primary: '#00aaff',
                }
            }}
            style={styles.header}
        >
            <Title style={styles.title}>
                {appName}
            </Title>
        </Appbar.Header>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    title: {
        color: 'white'
    }
});

export default Header;
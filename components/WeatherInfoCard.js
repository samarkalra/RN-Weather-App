import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title } from 'react-native-paper';

const WeatherInfoCard = ({ parameter, value }) => {
    return (
        <Card
            style={styles.card}
        >
            <Title style={{ color: '#00aaff' }}>
                {parameter} - {value}
            </Title>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: 5,
        padding: 12
    }
});

export default WeatherInfoCard;
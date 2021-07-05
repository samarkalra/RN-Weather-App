import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Title, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import WeatherInfoCard from '../components/WeatherInfoCard';

const Home = ({ route }) => {
    const initialText = 'loading';
    const [info, setInfo] = useState({
        name: initialText,
        temp: initialText,
        humidity: initialText,
        desc: initialText,
        icon: initialText
    });
    useEffect(() => {
        getWeather();
    }, [info]);
    const getWeather = async () => {
        let myCity = await AsyncStorage.getItem("newCity");
        if (!myCity) {
            const { city } = route.params;
            myCity = city;
        }

        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=ef69f0837ad544ae9fd64345211204&q=${myCity}&days=1&aqi=no&alerts=no`);
        const weatherData = await response.json();
        setInfo({
            name: weatherData.location.name,
            temp: weatherData.current.temp_c,
            humidity: weatherData.current.humidity,
            desc: weatherData.current.condition.text,
            icon: weatherData.current.condition.icon,
        });
    }
    return (
        <View style={{ flex: 1 }}>
            <Header appName='Weather App' />
            <View style={styles.mainContent}>
                <Title
                    style={styles.title}>
                    {info.name}
                </Title>
                <Image
                    style={styles.image}
                    source={{ uri: `https:${info.icon}` }} />
            </View>
            <WeatherInfoCard parameter='Temperature' value={info.temp} />
            <WeatherInfoCard parameter='Humidity' value={info.humidity} />
            <WeatherInfoCard parameter='Description' value={info.desc} />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#00aaff', marginTop: 30,
        fontSize: 30
    },
    image: {
        width: 120,
        height: 120,
    }
});

export default Home;
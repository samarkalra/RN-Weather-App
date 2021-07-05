import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

const Search = ({ navigation }) => {
    const [city, setCity] = useState('');
    const [cities, setCities] = useState([]);

    const fetchCities = async (searchQuery) => {
        setCity(searchQuery);
        const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=ef69f0837ad544ae9fd64345211204&q=${searchQuery}`);
        const citiesData = await response.json();
        if (citiesData.length > 5) {
            setCities(citiesData.slice(0, 5));
        } else {
            setCities([]);
        }
    }

    const handleSaveChanges = async () => {
        if (city) {
            await AsyncStorage.setItem('newCity', city);
            navigation.navigate('Home', { city });
        } else {
            Alert.alert('Please enter a city');
        }
    }

    const handleListCLick = async (cityName) => {
        const newCityName = cityName.split(',')[0];
        setCity(newCityName);
        await AsyncStorage.setItem('newCity', newCityName);
        navigation.navigate('Home', { city: newCityName });
    }

    return (
        <View style={{ flex: 1 }}>
            <Header appName='Weather App' />
            <TextInput
                label='city name'
                theme={{ colors: { primary: '#00aaff' } }}
                value={city}
                onChangeText={value => { fetchCities(value) }}
            />
            <Button
                icon="content-save"
                mode="contained"
                theme={{ colors: { primary: '#00aaff' } }}
                style={styles.btn}
                onPress={() => { handleSaveChanges() }}>
                <Text style={styles.btnText}>Save Changes</Text>
            </Button>
            <FlatList
                data={cities}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <Card
                            style={styles.autocompleteCard}
                            onPress={() => handleListCLick(item.name)}
                        >
                            <Text>{item.name}</Text>
                        </Card>);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    btn: {
        margin: 20
    },
    btnText: {
        color: 'white'
    },
    autocompleteCard: {
        margin: 2,
        padding: 12
    }
});

export default Search;
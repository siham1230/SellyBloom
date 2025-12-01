// app/HomeScreen.jsx
import React from 'react';
import { View, Text } from 'react-native';

export default function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFC9DC' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>🏠 Home Screen</Text>
        </View>
    );
}
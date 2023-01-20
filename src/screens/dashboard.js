import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Dimensions, Button } from 'react-native';
import DatePicker from 'react-native-date-picker';

export default function Dashboard() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{localize('Dashboard')}</Text>
        </View>
    );
}
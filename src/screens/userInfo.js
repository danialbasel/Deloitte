import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Dimensions, Button } from 'react-native';
import DatePicker from 'react-native-date-picker';

export default function UserInfo() {
    let fullWidth = Dimensions.get('window').width;
    const [open, setOpen] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [id, setID] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());

    Register = () => {
        if (!email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )) {
            setIsValidEmail(false);
            return;
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{localize('ID')}</Text>
            <TextInput style={{
                height: 40,
                margin: 12,
                borderWidth: 1,
                padding: 10,
                width: fullWidth * 0.75,
            }} placeholder={localize('ID')} onChangeText={setID}></TextInput>

            <Text>{localize('Email')}</Text>
            <TextInput style={[{
                height: 40,
                margin: 12,
                borderWidth: 1,
                padding: 10,
                width: fullWidth * 0.75,
            }, !isValidEmail ? { borderColor: 'red' } : null]}
                placeholder={localize('Email')} onChangeText={(text) => {
                    setEmail(text);
                    setIsValidEmail(true);
                }}></TextInput>

            <Text>{localize('PhoneNumber')}</Text>
            <TextInput style={{
                height: 40,
                margin: 12,
                borderWidth: 1,
                padding: 10,
                width: fullWidth * 0.75,
            }} placeholder={localize('PhoneNumber')} onChangeText={setPhoneNumber}></TextInput>

            <Text>{localize('DateOfBirth')}</Text>
            <View style={{
                height: 40,
                width: fullWidth * 0.75,
            }}>
                <Button title={dateOfBirth.toLocaleDateString()}
                    onPress={() => setOpen(true)} color={'#017A0B'} />
            </View>
            <DatePicker
                modal
                mode='date'
                maximumDate={new Date()}
                open={open}
                date={dateOfBirth}
                onConfirm={(date) => {
                    setOpen(false)
                    setDateOfBirth(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />

            <View style={{
                marginTop: 40,
                height: 40,
                width: fullWidth * 0.75,
            }}>
                <Button title={localize('Register')}
                    onPress={() => Register()} color={'#017A0B'} />
            </View>
        </View>
    );
}
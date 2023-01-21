import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Dimensions, Button } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { store } from '../redux/configureStore';
import * as actions from '../redux/actions';

export default function UserInfo() {
    const fullWidth = Dimensions.get('window').width;
    const [open, setOpen] = useState(false);
    const [userRegistered, setUserRegistered] = useState(false);
    const [isValidID, setIsValidID] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
    const [id, setID] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());


    useEffect(() => {
        let isUserLoggedIn = store.getState().auth.CurrentUser.ID !== null;
        setUserRegistered(isUserLoggedIn);
    }, [])

    Register = () => {
        let validUser = true
        if (id === '') {
            setIsValidID(false);
            validUser = false;
        }
        if (email === '' || !email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            setIsValidEmail(false);
            validUser = false;
        }
        /*
        Phone number valid formats
        (123) 456-7890
        (123)456-7890
        123-456-7890
        123.456.7890
        1234567890
        +31636363634
        075-63546725
        */
        if (phoneNumber === '' || !phoneNumber.match(
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        )) {
            setIsValidPhoneNumber(false);
            validUser = false;
        }

        if (!validUser) return;
        let User = {
            ID: id,
            Email: email,
            PhoneNumber: phoneNumber,
            DateOfBirth: dateOfBirth,
        }
        store.dispatch({ type: actions.REGISTER_NEW_USER, payload: User });
        setUserRegistered(true);
    }

    Logout = () => {
        store.dispatch({ type: actions.LOGOUT_CURRENT_USER });
        setUserRegistered(false);
    }

    if (userRegistered) {
        let CurrentUser = store.getState().auth.CurrentUser;
        return (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ fontSize: 20 }}>{localize('ID')} : {CurrentUser.ID}</Text>

                    <Text style={{ fontSize: 20 }}>{localize('Email')} : {CurrentUser.Email}</Text>

                    <Text style={{ fontSize: 20 }}>{localize('PhoneNumber')} : {CurrentUser.PhoneNumber}</Text>

                    <Text style={{ fontSize: 20 }}>{localize('DateOfBirth')} : {new Date(CurrentUser.DateOfBirth).toLocaleDateString()}</Text>
                </View>
                <View style={{
                    marginTop: 40,
                    height: 40,
                    width: fullWidth * 0.75,
                    alignSelf: 'center'
                }}>
                    <Button title={localize('LogOut')}
                        onPress={() => Logout()} color={'#017A0B'} />
                </View>
            </View>
        )
    } else {
        return (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ fontSize: 20, marginStart: 5 }}>{localize('ID')}</Text>
                    <TextInput style={[{
                        height: 40,
                        margin: 12,
                        borderWidth: 1,
                        padding: 10,
                        width: fullWidth * 0.75,
                    }, !isValidID ? { borderColor: 'red' } : null]}
                        placeholder={localize('ID')}
                        value={id}
                        onChangeText={(text) => {
                            setID(text);
                            setIsValidID(true);
                        }}></TextInput>
                    {!isValidID && <Text style={{ fontSize: 12, marginBottom: 5, color: 'red', marginStart: 12 }}>{localize('Required')}</Text>}

                    <Text style={{ fontSize: 20, marginStart: 5 }}>{localize('Email')}</Text>
                    <TextInput style={[{
                        height: 40,
                        margin: 12,
                        borderWidth: 1,
                        padding: 10,
                        width: fullWidth * 0.75,
                    }, !isValidEmail ? { borderColor: 'red' } : null]}
                        placeholder={localize('Email')}
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            setIsValidEmail(true);
                        }}></TextInput>
                    {!isValidEmail && <Text style={{ fontSize: 12, marginBottom: 5, color: 'red', marginStart: 12 }}>{localize('InvalidEmail')}</Text>}
                    <Text style={{ fontSize: 20, marginStart: 5 }}>{localize('PhoneNumber')}</Text>
                    <TextInput style={[{
                        height: 40,
                        margin: 12,
                        borderWidth: 1,
                        padding: 10,
                        width: fullWidth * 0.75,
                    }, !isValidPhoneNumber ? { borderColor: 'red' } : null]}
                        placeholder={localize('PhoneNumber')}
                        value={phoneNumber}
                        keyboardType={'numeric'}
                        onChangeText={(text) => {
                            setPhoneNumber(text);
                            setIsValidPhoneNumber(true);
                        }}></TextInput>
                    {!isValidPhoneNumber && <Text style={{ fontSize: 12, marginBottom: 5, color: 'red', marginStart: 12 }}>{localize('InvalidPhoneNumber')}</Text>}
                    <Text style={{ fontSize: 20, marginStart: 5 }}>{localize('DateOfBirth')}</Text>
                    <View style={{
                        height: 40,
                        width: fullWidth * 0.75,
                        margin: 12,
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
                </View>

                <View style={{
                    marginTop: 40,
                    height: 40,
                    width: fullWidth * 0.75,
                    alignSelf: 'center',
                }}>
                    <Button title={localize('Register')}
                        onPress={() => Register()} color={'#017A0B'} />
                </View>
            </View>
        )
    }
}
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { store } from '../redux/configureStore';
import * as actions from '../redux/actions';
import localize from '../localization/localizer';

export default function UserInfo() {
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
            <View style={styles.container}>
                <View>
                    <Text style={styles.infoLabel}>{localize('ID')} : {CurrentUser.ID}</Text>

                    <Text style={styles.infoLabel}>{localize('Email')} : {CurrentUser.Email}</Text>

                    <Text style={styles.infoLabel}>{localize('PhoneNumber')} : {CurrentUser.PhoneNumber}</Text>

                    <Text style={styles.infoLabel}>{localize('DateOfBirth')} : {new Date(CurrentUser.DateOfBirth).toLocaleDateString()}</Text>
                </View>
                <View style={styles.button}>
                    <Button title={localize('LogOut')}
                        onPress={() => Logout()} color={'#4BB543'} />
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.textInputLabel}>{localize('ID')}</Text>
                    <TextInput style={[styles.textInput, !isValidID ? styles.invalidInput : null]}
                        placeholder={localize('ID')}
                        value={id}
                        onChangeText={(text) => {
                            setID(text);
                            setIsValidID(true);
                        }}></TextInput>
                    {!isValidID && <Text style={styles.validationMessage}>{localize('Required')}</Text>}

                    <Text style={styles.textInputLabel}>{localize('Email')}</Text>
                    <TextInput style={[styles.textInput, !isValidEmail ? styles.invalidInput : null]}
                        placeholder={localize('Email')}
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            setIsValidEmail(true);
                        }}></TextInput>
                    {!isValidEmail && <Text style={styles.validationMessage}>{localize('InvalidEmail')}</Text>}
                    <Text style={styles.textInputLabel}>{localize('PhoneNumber')}</Text>
                    <TextInput style={[styles.textInput, !isValidPhoneNumber ? styles.invalidInput : null]}
                        placeholder={localize('PhoneNumber')}
                        value={phoneNumber}
                        keyboardType={'numeric'}
                        onChangeText={(text) => {
                            setPhoneNumber(text);
                            setIsValidPhoneNumber(true);
                        }}></TextInput>
                    {!isValidPhoneNumber && <Text style={styles.validationMessage}>{localize('InvalidPhoneNumber')}</Text>}
                    <Text style={styles.textInputLabel}>{localize('DateOfBirth')}</Text>
                    <View style={styles.datePicker}>
                        <Button title={dateOfBirth.toLocaleDateString()}
                            onPress={() => setOpen(true)} color={'gray'} />
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

                <View style={styles.button}>
                    <Button title={localize('Register')}
                        onPress={() => Register()} color={'#4BB543'} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '75%',
    },
    invalidInput: {
        borderColor: 'red',
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    textInputLabel: {
        fontSize: 20,
        marginStart: 5,
    },
    validationMessage: {
        fontSize: 12,
        marginBottom: 5,
        color: 'red',
        marginStart: 12,
    },
    button: {
        height: 40,
        width: '75%',
        alignSelf: 'center',
    },
    datePicker: {
        height: 40,
        width: '75%',
        margin: 12,
    },
    infoLabel: {
        fontSize: 20,
    },
})
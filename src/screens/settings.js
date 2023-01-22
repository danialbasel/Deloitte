import React, { useState, useEffect } from "react";
import { Text, View, Dimensions, Button, Alert, I18nManager, StyleSheet } from "react-native";
import { store } from '../redux/configureStore';
import * as actions from '../redux/actions';
import localize from '../localization/localizer';


export default function Settings() {
    const fullWidth = Dimensions.get('window').width;
    const [currentLang, SetCurrentLan] = useState('');
    const Languages = {
        'ara': 'Arabic',
        'eng': 'English',
    }
    useEffect(() => {
        let language = store.getState().auth.Language;
        SetCurrentLan(language);
    }, [])


    ChangeLanguage = () => {
        let nextLang = '';
        if (currentLang === 'eng')
            nextLang = 'ara';
        else
            nextLang = 'eng';
        store.dispatch({ type: actions.CHANGE_CURRENT_LANGUAGE, payload: nextLang })
        I18nManager.forceRTL(!I18nManager.isRTL)
        Alert.alert(
            'Reload this page',
            'Please reload this page to change the UI direction! '
        );
    }

    return (
        <View style={styles.container}>
            <Text>{localize('Language')} : {Languages[currentLang]}</Text>
            <View style={styles.button}>
                <Button title={localize('ChangeLanguage')}
                    onPress={() => ChangeLanguage()} color={'#4BB543'} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop: 40,
        height: 40,
        width: '75%',
    },
})
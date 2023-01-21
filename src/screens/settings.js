import React, { useState, useEffect } from "react";
import { Text, View, Dimensions, Button, Alert, I18nManager } from "react-native";
import { store } from '../redux/configureStore';
import * as actions from '../redux/actions';


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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{localize('Language')} : {Languages[currentLang]}</Text>
            <View style={{
                marginTop: 40,
                height: 40,
                width: fullWidth * 0.75,
            }}>
                <Button title={localize('ChangeLanguage')}
                    onPress={() => ChangeLanguage()} color={'#017A0B'} />
            </View>
        </View>
    )
}
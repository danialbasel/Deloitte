import React, { useEffect, useState } from 'react';
import { View, I18nManager, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from "react-native-splash-screen";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/configureStore';
import localize from './localization/localizer';
import Dashboard from './screens/dashboard';
import UserInfo from './screens/userInfo';
import Settings from './screens/settings';
import Icon from 'react-native-vector-icons/FontAwesome5';




function Loading() {
    return (
        <View style={{ flex: 1, zIndex: 1000, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large'></ActivityIndicator>
        </View>
    )
}

const Tab = createBottomTabNavigator();

function App() {
    useEffect(() => {
        SplashScreen.hide();
    }, []);
    const [userInfoTitle, setUserInfoTitle] = useState(localize('UserInfo'));
    const [dashboardTitle, setDashboardTitle] = useState(localize('Dashboard'));
    const [settingsTitle, setSettingsTitle] = useState(localize('Settings'));

    onBeforeLift = () => {
        let lang = store.getState().auth.Language;
        if (!lang || lang === 'eng') {
            I18nManager.forceRTL(false);
        } else {
            I18nManager.forceRTL(true);
        }
        setUserInfoTitle(localize('UserInfo'));
        setDashboardTitle(localize('Dashboard'));
        setSettingsTitle(localize('Settings'));
    }
    return (
        <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor} onBeforeLift={onBeforeLift}>
                <NavigationContainer>
                    <Tab.Navigator screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === dashboardTitle) {
                                iconName = 'table';
                            } else if (route.name === userInfoTitle) {
                                iconName = 'user';
                            } else if (route.name === settingsTitle) {
                                iconName = 'cog'
                            }

                            // You can return any component that you like here!
                            return <Icon name={iconName} size={size} color={color} />;
                        },
                    })}>
                        <Tab.Screen name={dashboardTitle} component={Dashboard} />
                        <Tab.Screen name={userInfoTitle} component={UserInfo} />
                        <Tab.Screen name={settingsTitle} component={Settings} />
                    </Tab.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}

export default App;
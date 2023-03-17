import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import Main from "./components/Main"
import Character from "./components/Character"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import ListOfCharacters from "./components/ListOfCharacters"

const Stack = createStackNavigator()

export default function MainStack() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={ {headerShown : false, gestureEnabled: false}}/>
                    <Stack.Screen name="Main" component={Main} options={ {headerShown : false, gestureEnabled: false}}/>
                    <Stack.Screen name="SignUp" component={SignUp} options={ {headerShown : false, gestureEnabled: false}}/>
                    <Stack.Screen name="Character" component={Character}/>
                    <Stack.Screen name="ListOfCharacters" component={ListOfCharacters}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
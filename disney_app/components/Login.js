import React, { useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity ,StyleSheet, SafeAreaView } from "react-native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState } from "react";
import { useNavigation } from '@react-navigation/core'
import { auth } from "../firebase/config";


export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation();

    const handleLogin = () => {
        console.log('well');
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with: ', user.email);
            })
            .catch(error => alert(error.message))
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                navigation.navigate('Main');
            }
        })

        return unsubscribe
    }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} 
        accessible={false}>
            <SafeAreaView style={styles.container}>
                <View style={styles.inputView} >
                    <TextInput  
                        value={email}
                        style={styles.inputText}
                        inputMode='email'
                        placeholder="Email..." 
                        placeholderTextColor="#1f1e33"
                        autoCorrect={false}
                        onChangeText={text => {
                            setEmail(text.replace(/\s/g, ''));
                        }}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        value={password}
                        style={styles.inputText}
                        secureTextEntry={true}
                        placeholder="Password..." 
                        placeholderTextColor="#1f1e33"
                        autoCorrect={false}
                        onChangeText={(text) =>  {
                            setPassword(text.replace(/\s/g, ''));
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => {
                        handleLogin();
                    }}
                    >
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('SignUp');
                        }}
                    >
                        <Text style={styles.loginText}>Signup</Text>
                    </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
      
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccd2d',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputView:{
        width:"80%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:50,
        color:"white"
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#FFA500",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:100,
        marginBottom:10
    },
})
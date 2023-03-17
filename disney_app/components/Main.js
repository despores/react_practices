import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, SafeAreaView, FlatList, Text, Alert } from "react-native";
import { TouchableWithoutFeedback, Keyboard, Image, StatusBar, Platform } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/core'
import { auth } from "../firebase/config";
import { Feather } from '@expo/vector-icons'; 

const SEARCH_URL = "https://api.disneyapi.dev/character?name="
const ALL_CHARACTERS_URL = "https://api.disneyapi.dev/characters?page=1"




export default function Main() {

    const [characters, setCharacters] = useState([]);

    const navigation = useNavigation();

    const setAtributes = (data) => {
        data.forEach((character) => {
            const {
                films,
                shortfilms,
                _id,
                tvShows,
                videogames,
                parkAttractions,
                allies,
                enemies,
                name,
                imageUrl,
                url
            } = character;
    
            setCharacters((list) => {
                return [
                    ...list,
                    {
                        image: imageUrl,
                        name: name,
                        films: films,
                        shortFilms: shortfilms,
                        tvShows: tvShows,
                        videogames: videogames,
                        key: _id,
                    }
                ]
            });
        });
    }
    
    const searchCharacters = (url) => {
        if (url === SEARCH_URL) {
            url = ALL_CHARACTERS_URL;
        }
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setAtributes(json.data);
            });
    }

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                console.log(auth.currentUser);
                navigation.navigate('Login');
            })
            .catch(error => alert(error.message))
    }

    const confirmDelete = () => {
        Alert.alert('Delete current account', 'Are you sure?', [
            {
                text: 'No',
                style: 'cancel',
              },
              {text: 'Yes', onPress: () => handleDelete()},
        ])
    }

    const handleDelete = () => {
        console.log(auth.currentUser);
        auth
            .currentUser.delete()
            .then(() => {
                navigation.navigate('Login');
            })
            .catch(error => alert(error.message))
    }


    useEffect(() => {
        searchCharacters(SEARCH_URL);
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} 
        accessible={false}>
            <SafeAreaView style={styles.outerContainer}>
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.accountBtn}
                        onPress={() => {
                            handleSignOut();
                        }}
                        >
                            <Text style={styles.textDisney}>
                                Log out
                             </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.accountBtn}
                        onPress={() => {
                            confirmDelete();
                        }}
                        >
                            <Text style={styles.textDisney}>Del acc</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={"Search..."}
                        onSubmitEditing={(event) => {
                            setCharacters([]);
                            //console.log(event.nativeEvent.text);
                            searchCharacters(SEARCH_URL + event.nativeEvent.text);
                        }}
                    />
                </View>
                <FlatList
                    style={styles.list}
                    data={characters}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.tableItem}
                            onPress={() => {
                                navigation.navigate("Character", item);
                            }}
                        >
                            <Image
                                style={styles.image}
                                source={
                                    item.image
                                        ? { uri: item.image }
                                        : require("../assets/no-image.png")
                                }
                            />
                        </TouchableOpacity>
                    )}
                    numColumns={3}
                />
                <TouchableOpacity
                            style={styles.roundButton}
                            onPress={() => {
                                // не работает :(
                                //navigation.navigate("ListOfCharacters")
                            }}
                        >
                            <Feather name="list" size={24} color="black" />
                        </TouchableOpacity>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    textDisney: {
        fontSize: 15,
        color: '#1f1e33',
    },
    searchInput: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#1f1e33',
        color: '#1f1e33',
        fontSize: 20,
        padding: 15,
        marginRight: 10,
        width: '45%',
        backgroundColor: '#FFA500',
      },
    outerContainer: {
        flex: 1,
        paddingTop: Platform.OS === "android" 
        ? StatusBar.currentHeight : 0,
        flexDirection: 'column',
        backgroundColor: '#ccd2db'
    },
    container: {
        flex: 0.1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#FFA500',
    },
    list: {
        flex: 0.9,
    },
    tableItem: {
        backgroundColor: '#f9c2ff',
        width: '25%',
        height: 160,
        alignContent: 'space-around',
        marginVertical: 8,
        marginHorizontal: '4%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    accountBtn:{
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        marginLeft:10,
        padding: 12,
        width: '20%',
        alignItems:"center",
        justifyContent:"center",
    },
    roundButton: {
        position: 'absolute',
        right: 20,
        bottom: 50,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignSelf: 'flex-end',
        marginBottom: 10,
        marginRight:10,
        backgroundColor: '#FFA500',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
import React, { useEffect, useState } from "react";
import { StyleSheet, ImageBackground, Text, Image,
    Dimensions, 
    ScrollView,
    View,
    TextInput} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/core'
import BottomSheet from 'reanimated-bottom-sheet'
import { getCloudData, setCloudData, addCloudData } from "../firebase/cloudData";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


export default function Character(character) {

    //console.log(character);


    const navigation = useNavigation();

    const {
        films,
        image,
        key,
        name,
        shortFilms,
        tvShows,
        videogames,
    } = character.route.params;

    const [comment, setComment] = useState('');

    const commentSheetRef = React.useRef(null);
    const listSheetRef = React.useRef(null);


    const commentSheet = () => (
        <View
          style={{
            backgroundColor: 'white',
            padding: 16,
            height: 600,
          }}
        >
            <TextInput
                value={comment}
                style={styles.commentInput}
                placeholder={"Input your comment here..."}
                blurOnSubmit={true}
                multiline={true}
                maxLength={200}
                numberOfLines={7}
                onChangeText={text => {
                    setComment(text)
                }}
                onSubmitEditing={(event) => {
                    console.log('submitted')
                    setComment(event.nativeEvent.text);
                    setCloudData('comment_' + name, {
                        comment: comment
                    });
                }}
            />
        </View>
    );

    const listSheet = () => {
        
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCloudData('comment_' + name);
                if(response !== undefined) {
                    console.log(response);
                    setComment(response.comment);
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
    }, [])

    return (
            <ImageBackground
                style={styles.image}
                source={require("../assets/logo.png")}
                blurRadius={0.1}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} 
                accessible={false}>
                    <LinearGradient
                        colors={['#00000000', '#333333']}
                        style={styles.gradient}
                    >
                        <TouchableOpacity
                            name='list'
                            style={styles.listButton}
                            onPress={() => {
                                //не работает
                            }}
                        >
                            <FontAwesome name="star" size={24} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            name='comment'
                            style={styles.commentButton}
                            onPress={() => {
                                listSheetRef.current.snapTo(0);
                                commentSheetRef.current.snapTo(2);
                            }}
                        >
                            <FontAwesome5 name="pencil-alt" size={24} color="black" />
                        </TouchableOpacity>
                        <Image
                            style={styles.characterImage}
                            source={
                                image
                                    ? { uri: image }
                                    : require("../assets/no-image.png")
                            }
                        />
                        <Text style={styles.textDisney}>{name}</Text>
                        <ScrollView style={styles.scrollView}>
                            <View
                                style={styles.scrollText}
                            >
                                <Text
                                style={styles.textDisney}
                                >
                                    Appearances: {
                                    [films, shortFilms, tvShows, videogames].join('').length === 0
                                    ? 'none :('
                                    : [films, shortFilms, tvShows, videogames] .join('\n')
                                }
                                </Text>
                            </View>
                        </ScrollView>
                        <BottomSheet
                            ref={commentSheetRef}
                            snapPoints={[0, 300, 600]}
                            borderRadius={10}
                            renderContent={commentSheet}
                        />
                        <BottomSheet
                            ref={listSheetRef}
                            snapPoints={[0, 300, 600]}
                            borderRadius={10}
                            renderContent={listSheet}
                        />
                    </LinearGradient>
                </TouchableWithoutFeedback>
                <Image 
                    style={styles.characterInfo}
                />
            </ImageBackground>
    )
}


const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#ccd2db'
    },
    image: {
        flex: 1,
        height: screenHeight,
        width: screenWidth,
    },
    characterImage: {
        alignContent: 'center',
        height: 320,
        width: '50%'
    },
    textDisney: {
        fontSize: 25,
        marginBottom: 15,
        color: 'white',
    },
    gradient: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    listButton: {
        position: 'absolute',
        right: 10,
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignSelf: 'flex-end',
        marginTop: 10,
        marginRight:10,
        backgroundColor: '#FFA500',
        justifyContent: 'center',
        alignItems: 'center'
    },
    commentButton: {
        position: 'absolute',
        right: 10,
        top: 80,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignSelf: 'flex-end',
        marginTop: 10,
        marginRight:10,
        backgroundColor: '#FFA500',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollView: { 
        paddingBottom: 30,
        marginHorizontal: 20,
    },
    scrollText: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    commentInput: {
        color: '#1f1e33',
        fontSize: 20,
        width: '100%',
        height: 600,
      },
});

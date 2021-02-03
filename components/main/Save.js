import React,{useState} from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

import firebase from 'firebase'

// import { NavigationContainer } from '@react-navigation/native'
require("firebase/firestore")
require("firebase/firebase-storage")

const Save = (props ) => {

    const [caption, setcaption] = useState("")

    const uploadimage = async() =>{ 

        const uri = props.route.params.image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        console.log(childPath);


        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase.storage().ref().child(childPath).put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const savePostData = (downloadURL) => {

        firebase.firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add({
                downloadURL,
                caption,
                likesCount: 0,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then((function () {
                props.navigation.popToTop()
            }))
    }


    // console.log(props.route.params.image);
    return (
        <View style={{flex:1}}>
            <Image source={{uri:props.route.params.image}}/>
            <TextInput 
            placeholder="Write a Caption...."
            onChangeText={(caption)=>{setcaption(caption)}}
            />
            <Button title="Svae" onPress={()=>{uploadimage()}}/>
        </View>
    )
}

export default Save;

const styles = StyleSheet.create({})

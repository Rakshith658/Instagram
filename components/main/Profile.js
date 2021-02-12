import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native'

import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'

const Profile = ( props ) => {

  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false)

  useEffect(()=>{
    const { currentUser,posts}=props;
    console.log({currentUser,posts});

    if(props.route.params.uid === firebase.auth().currentUser.uid){
      setUser(currentUser);
      setUserPosts(posts)
    }else{
      firebase.firestore()
      .collection("users")
      .doc(props.route.params.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data());
        }
        else {
          console.log('does not exist')
        }
      })
    firebase.firestore()
      .collection("posts")
      .doc(props.route.params.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data }
        })
        setUserPosts(posts)
      })
    }
    if (props.following.indexOf(props.route.params.uid) > -1) {
      setFollowing(true);
    } else { 
      setFollowing(false);
    }
  },[ props.route.params.uid, props.following])

  const onFollow = () => {
    firebase.firestore()
    .collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("usrFollowing")
    .doc(props.route.params.uid)
    .set({})
  }

  const onUnfollow = () => {
    firebase.firestore()
    .collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("usrFollowing")
    .doc(props.route.params.uid)
    .delete()
  }

  if(user === null){
    <View/>
  }
  

  return (
      <View style={styles.container}>
        <View style={styles.containerInfo}>
          <Text>{user ? user.name : "Rakshith Kumar S"}</Text>
          <Text>{user ? user.email : "rakshithkumars7777@gmail.com"}</Text>

          {props.route.params.uid !== firebase.auth().currentUser.uid ? (
            <View>
              { following ? (
                <Button
                  title="Following"
                  onPress={()=> onUnfollow()}
                />
              ):(
                <Button
                  title="Follow"
                  onPress={()=> onFollow()}
                />
              )}
            </View>
          ): null}
        </View>
        <View style={styles.containerGallery}>
          <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
                        <View
                          style={styles.containerImage}>

                          <Image
                              style={styles.image}
                              source={{ uri: item.downloadURL }}
                          />
                        </View>
                      )}
          />
        </View>
      </View>
  )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following
})



export default connect(mapStateToProps, null)(Profile);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:40
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1 / 3

    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    }
})

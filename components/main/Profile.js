import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native'

import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'

const Profile = ( props ) => {

  const { currentUser,posts}=props;
  console.log({currentUser,posts});
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false)

  return (
      <View style={styles.container}>
        <View style={styles.containerInfo}>
          <Text>{currentUser ? currentUser.name : "Rakshith Kumar S"}</Text>
          <Text>{currentUser ? currentUser.email : "rakshithkumars7777@gmail.com"}</Text>
        </View>
        <View style={styles.containerGallery}>
          <FlatList
          numColumns={3}
          horizontal={false}
          data={posts}
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
    // following: store.userState.following
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

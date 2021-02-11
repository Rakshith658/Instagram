import React,{useState} from 'react'
import { StyleSheet, Text, View ,TextInput,FlatList, TouchableOpacity, InteractionManager } from 'react-native'

import firebase from 'firebase'
import Card from '../../styles/Card'
require('firebase/firestore')

const Search = ( props ) => {

  const [users, setusers] = useState([]);

  const fetchUsers = (search) => {
    firebase.firestore()
    .collection('users')
    .where('name','>=',search)
    .get()
    .then((snapshort)=>{
      let users = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data }
      })
      setusers(users)
    })
  }

  return (
    <View style={styles.container}>
      <Card style={{marginHorizontal:20,marginVertical:30}}>
        <View style={styles.TextInput}>
          <TextInput 
          placeholder="Type here...."
          onChangeText={(search)=>fetchUsers(search)} 
          style={styles.Input}
        />
        </View>
      </Card>
      <View>
        <Card>
          <FlatList
          numColumns={1}
          horizontal={false}
          data={users}
          renderItem={({item}) => (
            <TouchableOpacity onPress={()=>props.navigation.navigate("Profile",{uid:item.id})}>
              <Card style={{marginVertical:20,marginHorizontal:20}}>
                <Text>{item.name}</Text>
              </Card>
            </TouchableOpacity>
          )}
          />
        </Card>
      </View>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  Input:{
    // height:30,
    marginVertical:10,
    borderColor:'grey',
    borderBottomWidth:1,
  },
  TextInput:{
    marginHorizontal:20,
    marginVertical:10
  },
});

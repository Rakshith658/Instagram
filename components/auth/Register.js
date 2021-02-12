import React ,{Component} from 'react'
import { Button, StyleSheet, Text, View,TextInput } from 'react-native'
import Card from '../../styles/Card';

import firebase from 'firebase'

export class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            name:''
        }
        this.Signup=this.Signup.bind(this)
    }

    Signup(){
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            firebase.firestore().collection("users")
                .doc(firebase.auth().currentUser.uid)
                .set({
                    name,
                    email
                })
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <View style={styles.main}>
            <View style={styles.TextInput}>
                <Card>
                    <TextInput 
                    placeholder="name"
                    onChangeText={(name)=>this.setState({name})}
                    style={styles.Input}
                    />
                    <TextInput 
                    placeholder="Email" 
                    style={styles.Input}
                    onChangeText={(email)=>this.setState({email})}
                    />
                    <TextInput 
                    placeholder="password"
                    style={styles.Input}
                    secureTextEntry={true}
                    onChangeText={(password)=>this.setState({password})}
                    />
                </Card>
            </View>
            <View style={styles.Button}>
                <Card >
                    <View style={{margin:30}}>
                        <Button title="Sign Up" color='green' onPress={()=>this.Signup()}/>
                    </View>
                </Card>
            </View>
        </View>
        )
    }
}

export default Register



const styles = StyleSheet.create({
     main:{
        
        flex:1
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
    Button:{
        marginTop:30,
        marginHorizontal:35
    }
})

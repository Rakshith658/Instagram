import React, { Component } from 'react'
import { StyleSheet, Text, View,Button,TextInput } from 'react-native'
import Card from '../../styles/Card'

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
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
                    placeholder="Email" 
                    style={styles.Input}
                    onChangeText={(email)=>this.setState({email})}
                    />
                    <TextInput 
                    placeholder="password"
                    style={styles.Input}
                    onChangeText={(password)=>this.setState({password})}
                    />
                </Card>
            </View>
            <View style={styles.Button}>
                <Card >
                    <View style={{margin:30}}>
                        <Button title="Login" color='green'/>
                    </View>
                </Card>
            </View>
        </View>
        )
    }
}

export default Login


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

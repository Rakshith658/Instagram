import React ,{Component} from 'react'
import { Button, StyleSheet, Text, View,TextInput } from 'react-native'
import Card from '../../styles/Card'

export class Register extends Component {
    render() {
        return (
            <View style={styles.main}>
            <View style={styles.TextInput}>
                <Card>
                    <TextInput 
                    placeholder="name"
                    style={styles.Input}
                    />
                    <TextInput 
                    placeholder="Email" 
                    style={styles.Input}
                    />
                    <TextInput 
                    placeholder="password"
                    style={styles.Input}
                    />
                </Card>
            </View>
            <View style={styles.Button}>
                <Card >
                    <View style={{margin:30}}>
                        <Button title="Sign Up" color='green'/>
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

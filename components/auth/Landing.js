import React from 'react'
import { Text, View, Button ,StyleSheet } from 'react-native';
import Card from '../../styles/Card';


export default function Landing({ navigation }) {
    return (
        <View style={styles.maincontainer}>
            <View style={styles.text}>
                <Text style={{fontWeight:'bold',fontSize:25}}>Rakshith Kumar s</Text> 
            </View>
        <View style={styles.buttonContainer}>
            <Card>    
            <Button
                title="Register"
                onPress={() => navigation.navigate("Register")} 
                />
            </Card>
            <Card>
            <Button
                title="Login"
                onPress={() => navigation.navigate("Login")} 
                />
            </Card>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer:{
        flexDirection:'row',
        flex:2,
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal:30
    },
    maincontainer:{
        //alignItems:'center',
        flex:1
    },
    text:{
        alignItems:'center',
        justifyContent:'center',
        flex:1
    }
})
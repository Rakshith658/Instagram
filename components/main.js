import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
    fetchUser, 
    // fetchUserPosts, 
    // fetchUserFollowing, 
    // clearData 
} from '../redux/actions/index'

export class main extends Component {
    componentDidMount() {
        // this.props.clearData();
        this.props.fetchUser();
        // this.props.fetchUserPosts();
        // this.props.fetchUserFollowing();
    }
    render() {
        const { currentUser }=this.props
        console.log(currentUser);
        if(currentUser==undefined){
            return(
                <View>
                    <Text>all ok</Text>
                </View>
            )
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center' , alignItems:'center' }}>
                <Text>{currentUser.name}</Text>
            </View>
        )
    }
}


const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(main);
// export default connect(null, mapDispatchProps)(main);
// export default main

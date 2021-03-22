import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import {useNavigation} from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';


const CustomButton = (props)=> {

    const navigation = useNavigation()

    const isInitialMount = React.useRef(true)

    const onClickIcon = () =>{
        navigation.navigate('Contacts',{data:props.data.friends})
    }

    return (
        <View style={styles.root}>
            <TouchableOpacity onPress={onClickIcon} >
                <MaterialCommunityIcons name="message-reply-text" size={28} color="#fff"/>
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = (state) => ({
    data :state.friends
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getFriends: (id) => dispatch(getFriends(id)),
    };
  };

  export default connect(mapStateToProps,mapDispatchToProps)(CustomButton)


const styles = StyleSheet.create({
    root:{
        position:"absolute",
        bottom:40,
        right:10,
        backgroundColor:"#37a000",
        width:50,
        height:50,
        borderRadius:100,
        justifyContent:"center",
        alignItems:"center"
    }
})

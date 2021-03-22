import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import ChatListItem from '../components/ChatListItem'
import CustomButton from '../components/CustomButton'
import item from '../data/chatItem'
import {getFriends} from "../redux/friends/action"
import axios from 'axios'
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native'

const ChatScreen = (props) =>{

    const [data,setData] = React.useState({})
    const navigation = useNavigation()


    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('id').then(val=>{
          props.getFriends({"id":val})
        })
      } catch(e) {
        // error reading value
      }
    }
    
    React.useEffect( ()=>{
      getData()
      console.log(props.navigation)
    },[])

    return (
        <View style={styles.root}>
          <FlatList
            keyExtractor={item=>item.id.toString()}
            data={props.data.friends}
            renderItem={({item})=>(
                <ChatListItem ChatRoom={item}/>
            )}
          />
          <CustomButton/>
        </View>
    )
}

const styles = StyleSheet.create({
    root:{
        flex:1
    }
})

const mapStateToProps = (state) => ({
    data :state.friends
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getFriends: (id) => dispatch(getFriends(id)),
    };
  };

export default connect(mapStateToProps,mapDispatchToProps)(ChatScreen)
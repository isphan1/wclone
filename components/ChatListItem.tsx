import React from 'react'
import { Text, View , StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import {ChatRoom} from "../types"
import {useNavigation} from '@react-navigation/native'
import moment from 'moment'
import axios from 'axios'
import {getMessage} from '../redux/message/action'
import { connect } from 'react-redux'
import {io} from 'socket.io-client'

export type ChatListItemProps = {
    ChatRoom:ChatRoom
}

const  ChatListItem = (props) => {

    const {ChatRoom} = props
    const navigation = useNavigation()

    const msgRef = React.useRef(io())

    // const socketRef = () =>{
    //     return msgRef
    // }

    const onClick = ()=>{
                navigation.navigate('ChatRoom',{id:ChatRoom.id,chatList:ChatRoom,msgRef:msgRef})                
             }
    const user = ChatRoom.users[1]



    return (
    <TouchableWithoutFeedback onPress={onClick}>

        <View style={styles.root}>
            <View style={styles.imageBox}>
                <Image 
                    style={styles.image}
                    source={{uri:user.imageUri}}
                />
            </View>

            <View style={styles.chatBox}>
                <View style={styles.chatHeader}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.time}>{moment(ChatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}</Text>
                </View>
                <View>
                    <Text numberOfLines={1} style={styles.description}>{ChatRoom.lastMessage.content}</Text>
                </View>
                <View style={styles.borderDown}></View>
            </View>
        </View>
    </TouchableWithoutFeedback>
    )
}

const mapStateToProps = (state) => ({
    data :state.messages
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getMessage: (data) => dispatch(getMessage(data)),
    };
  };


export default connect(mapStateToProps,mapDispatchToProps)(ChatListItem)

const styles = StyleSheet.create({
    root:{
        width:"100%",
        height:100,
        flexDirection:"row",
        alignItems:"center",
    },
    image:{
        width:65,
        height:65,
        borderRadius:100
    },
    imageBox:{
        width:"20%",
        alignItems:"center",
        padding:10,
    },
    chatBox:{
        width:"80%",
        paddingLeft:10,
        paddingRight:10,
    },
    borderDown:{
        marginTop:20,
        width:"100%",
        height:1,
        paddingLeft:10,
        backgroundColor:"#ccc"
    },
    chatHeader:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    userName:{
        fontSize:18,
        fontWeight:"bold"
    },
    time:{
        fontSize:14,
        color:"grey"
    },
    description:{
        fontSize:16,
        color:"grey"
    }
})
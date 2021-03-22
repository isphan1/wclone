import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {UserMessage} from "../types"
import moment from "moment"
export type ChatMessageProps = {
    ChatMessage : UserMessage
}

export default function ChatMessage(props:any) {

    const {ChatMessage} = props

    const isMyMessage = () =>{
        return ChatMessage.user.id === "u1"
    }

    return (
        <View style={styles.root}>
            
            <View style={isMyMessage() ? styles.messageBoxMe : styles.messageBox}>
                <Text style={[styles.username,{
                    display : isMyMessage () ? "none" : "flex"
                }]}>{ChatMessage.user.name}</Text>
                <Text style={[styles.message,{
                    marginVertical:isMyMessage () ? 0 : 5,
                }]}>{ChatMessage.content}</Text>
                <Text style={styles.time}>{moment(ChatMessage.createdAt).fromNow()}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    root:{
        flex:1,
        padding:20,
        paddingBottom:0
    },
    username:{
        fontSize:16,
        fontWeight:"bold"
    },
    message:{
        fontSize:18,
        marginVertical:5
    },
    time:{
        textAlign:"right",
        fontSize:14
    },
    messageBox:{
        padding:10,
        justifyContent:"center",
        marginRight:50,
        backgroundColor:"#fff",
        borderRadius:10
    },
    messageBoxMe:{
        padding:10,
        justifyContent:"center",
        marginLeft:50,
        backgroundColor:"#DCF8C5",
        borderRadius:10
    },
})
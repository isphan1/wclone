import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Text, View ,Image,StyleSheet,TouchableOpacity,TouchableHighlight } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import AuthContext from "../data/AuthContext";

export default function ChatRoomTitle(props:any) {
    
    const {ChatRoom,msgRef} = props

    // const { ioRef } = React.useContext(AuthContext);
    // const msgRef = ioRef()

    const navigation = useNavigation()

    const onClickIcon = () =>{
        msgRef.current.emit('end');
        navigation.navigate('Chats')
    }

    var description = ChatRoom.lastMessage.content ? (ChatRoom.lastMessage.content).substring(0,20)+"..." : ""

    return (
    <View style={styles.root}>
        <View style={{
            marginRight:7.5,
            borderRadius: 15, 
            overflow: 'hidden' 
        }}>
            <TouchableHighlight
                underlayColor="#094a42"
                onPress={onClickIcon} 
            >
                <MaterialCommunityIcons 
                    name="arrow-left" 
                    size={28} 
                    color="#fff"
                    style={styles.iconButton} 
                /> 
            </TouchableHighlight>
        </View>
        <View style={styles.imageBox}>
            <Image 
                style={styles.image}
                source={{uri:ChatRoom.users[1].imageUri}}
            />
        </View>

            <View style={styles.chatHeader}>
                <Text style={styles.userName}>{ChatRoom.users[1].name}</Text>
                <Text numberOfLines={1} style={styles.description}>{description}</Text>
            </View>
    </View>
)
}

const styles = StyleSheet.create({
root:{
    width:"100%",
    height:100,
    flexDirection:"row",
    alignItems:"center",
    marginLeft:10,
},
image:{
    width:45,
    height:45,
    borderRadius:100
},
imageBox:{
    alignItems:"center",
},
chatHeader:{
    paddingLeft:10,
    paddingRight:10,
    flexDirection:"column",
    marginBottom:2.5
},
userName:{
    fontSize:18,
    fontWeight:"bold",
    color:"#fff"
},
description:{
    fontSize:16,
    color:"#fff",
},
iconButton:{
    padding:5,
}
})